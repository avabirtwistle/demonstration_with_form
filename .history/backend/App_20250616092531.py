from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import serial
import threading
import time

app = Flask(__name__)
CORS(app)

# — Serial setup — 
BT_PORT = "/dev/cu.usbserial-210"   # ← update to your port
BT_BAUD = 115200

try:
    ser = serial.Serial(BT_PORT, BT_BAUD, timeout=1)
    time.sleep(2)  # allow ESP32 to reboot
    print(f"Opened serial on {BT_PORT}@{BT_BAUD}")
except Exception as e:
    print("Serial port error:", e)
    ser = None

serial_lock = threading.Lock()

# — State for QR streams —
_last_qr = None
_location_qr = None

def send_serial(loc: str, state: str) -> bool:
    """Send "loc state\n" over serial. Returns False if port not open."""
    if not ser or not ser.is_open:
        return False
    cmd = f"{loc} {state}\n".encode("utf-8")
    with serial_lock:
        ser.write(cmd)
    print(f"[SERIAL OUT] {cmd.strip().decode()}")
    return True

# — Tray endpoints —
@app.route('/tray')
def handle_tray():
    global _last_qr
    code = request.args.get("code")
    if not code:
        return "Missing code", 400
    _last_qr = code
    print(f"[SCAN] Tray scanned: {code}")
    return f"Tray scanned: {code}", 200

@app.route('/reset_qr', methods=['POST'])
def reset_qr():
    global _last_qr
    _last_qr = None
    return "", 204

@app.route('/stream')
def stream_tray():
    def events():
        last = None
        while True:
            time.sleep(0.5)
            if _last_qr and _last_qr != last:
                yield f"data: {_last_qr}\n\n"
                last = _last_qr
    return Response(events(), mimetype="text/event-stream")

# — Location endpoints —
@app.route('/location')
def handle_location():
    global _location_qr
    code = request.args.get("code")
    if not code:
        return "Missing code", 400
    _location_qr = code
    print(f"[SCAN] Location scanned: {code}")
    return f"Location scanned: {code}", 200

@app.route('/reset_location', methods=['POST'])
def reset_location():
    global _location_qr
    _location_qr = None
    return "", 204

@app.route('/stream/location')
def stream_location():
    def events():
        last = None
        while True:
            time.sleep(0.5)
            if _location_qr and _location_qr != last:
                yield f"data: {_location_qr}\n\n"
                last = _location_qr
    return Response(events(), mimetype="text/event-stream")

# — Generic send endpoint —
@app.route('/send')
def send_cmd():
    raw = request.args.get("cmd", "").strip()
    if not raw:
        return "Missing cmd parameter", 400
    if not send_serial(*raw.split(" ", 1)):
        return "Serial port not available", 500
    return jsonify(sent=raw + ("\n" if not raw.endswith("\n") else "")), 200

# — Convenient on/off shortcuts —
@app.route('/light/<loc>/on')
def light_on(loc):
    send_serial(loc, "on")
    return "", 204

@app.route('/light/<loc>/off')
def light_off(loc):
    send_serial(loc, "off")
    return "", 204

if __name__ == "__main__":
    print("\nRegistered routes:")
    for rule in app.url_map.iter_rules():
        methods = ",".join(rule.methods - {"HEAD", "OPTIONS"})
        print(f"{methods:10s} -> {rule.rule}")
    print()
    app.run(host="0.0.0.0", port=5000)
