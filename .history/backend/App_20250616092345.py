from flask import Flask, request, Response
from flask_cors import CORS
import serial
import threading
import time

app = Flask(__name__)
CORS(app)

# ——————— Serial setup ———————
BT_PORT = "/dev/cu.usbserial-210"    # adjust as needed
BT_BAUD = 115200

try:
    ser = serial.Serial(BT_PORT, BT_BAUD, timeout=1)
    time.sleep(2)   # let the ESP32 reboot
    print(f"Opened serial on {BT_PORT} @ {BT_BAUD}")
except Exception as e:
    print("Failed to open serial port:", e)
    ser = None

serial_lock = threading.Lock()

# ——————— Existing QR state ———————
_last_qr = None
_location_qr = None

# ——————— Tray QR endpoints ———————
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

# ——————— Location QR endpoints ———————
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
    global _location_qr
    _location_qr = None
    return "", 204

@app.route('/stream/location')
def stream_location():
    def event_stream():
        last = None
        while True:
            time.sleep(0.5)
            if _location_qr and _location_qr != last:
                yield f"data: {_location_qr}\n\n"
                last = _location_qr
    return Response(event_stream(), mimetype="text/event-stream")

# ——————— New: Send arbitrary serial command ———————
@app.route('/send')
def send_cmd():
    """
    Usage: GET /send?cmd=A3%20on
    Will write "A3 on\n" over the serial link.
    """
    if not ser or not ser.is_open:
        return "Serial port not available", 500

    raw = request.args.get("cmd", "").strip()
    if not raw:
        return "Missing cmd parameter", 400

    # Append newline if the user didn't
    cmd = raw + ("\n" if not raw.endswith("\n") else "")
    try:
        with serial_lock:
            ser.write(cmd.encode("utf-8"))
        print(f"[SERIAL OUT] {cmd.strip()}")
        return jsonify(sent=cmd), 200
    except Exception as e:
        print("Serial write error:", e)
        return f"Error sending command: {e}", 500

if __name__ == "__main__":
    print("\nRegistered routes:")
    for rule in app.url_map.iter_rules():
        methods = ",".join(rule.methods - {"HEAD", "OPTIONS"})
        print(f"{methods:10s} -> {rule.rule}")
    print()
    app.run(host="0.0.0.0", port=5000)
