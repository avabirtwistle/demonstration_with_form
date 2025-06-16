from flask import Flask, request, Response
from flask_cors import CORS
import serial
import threading
import time

app = Flask(__name__)
CORS(app)

# ——————— Serial setup ———————
# adjust this to the name your ESP32 actually uses
ser = serial.Serial('/dev/cu.wchusbserial210', 115200, timeout=1)
time.sleep(2)    # let the ESP32 reboot and settle

# ——————— Shared state ———————
_last_qr = None
_location_qr = None

# flags & thread handle for flashing A3
_flashing = False
_flash_thread = None

def _flash_loop(pin_label='A3', interval=0.5):
    """Background loop: toggles pin_label on/off until _flashing=False."""
    global _flashing
    while _flashing:
        ser.write(f"{pin_label} on\n".encode())
        time.sleep(interval)
        ser.write(f"{pin_label} off\n".encode())
        time.sleep(interval)
    # ensure final off
    ser.write(f"{pin_label} off\n".encode())

# ——————— Tray endpoints (unchanged) ———————
@app.route('/tray')
def handle_tray():
    global _last_qr
    code = request.args.get("code")
    if code:
        _last_qr = code
        print(f"[SCAN] Tray scanned: {code}")
        return f"Tray scanned: {code}", 200
    return "Missing code", 400

@app.route('/reset_qr', methods=['POST'])
def reset_qr():
    global _last_qr
    _last_qr = None
    return "", 204

@app.route('/stream')
def stream_tray():
    def event_stream():
        last = None
        while True:
            time.sleep(0.5)
            if _last_qr and _last_qr != last:
                yield f"data: {_last_qr}\n\n"
                last = _last_qr
    return Response(event_stream(), mimetype="text/event-stream")

# ——————— Location endpoints (with flashing) ———————
@app.route('/location')
def handle_location():
    global _location_qr
    code = request.args.get("code")
    if code:
        _location_qr = code
        print(f"[SCAN] Location scanned: {code}")
        return f"Location scanned: {code}", 200
    return "Location missing code", 400

@app.route('/reset_location', methods=['POST'])
def reset_location():
    global _location_qr, _flashing, _flash_thread
    _location_qr = None

    # start flashing in background
    _flashing = True
    if not _flash_thread or not _flash_thread.is_alive():
        _flash_thread = threading.Thread(target=_flash_loop, daemon=True)
        _flash_thread.start()

    return "", 204

@app.route('/stream/location')
def stream_location():
    def event_stream():
        global _flashing
        last = None
        while True:
            time.sleep(0.5)
            if _location_qr and _location_qr != last:
                # stop flashing and ensure A3 is off
                _flashing = False
                yield f"data: {_location_qr}\n\n"
                last = _location_qr
    return Response(event_stream(), mimetype="text/event-stream")


if __name__ == "__main__":
    print("\nRegistered routes:")
    for rule in app.url_map.iter_rules():
        methods = ",".join(rule.methods - {"HEAD", "OPTIONS"})
        print(f"{methods:10s} -> {rule.rule}")
    print()
    app.run(host="0.0.0.0", port=5000)
