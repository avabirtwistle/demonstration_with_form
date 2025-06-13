from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from src.model.getFreeSpace import get_free_locations

import time

app = Flask(__name__)
CORS(app)

_last_qr = None

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
def stream():
    def event_stream():
        last_sent = None
        while True:
            time.sleep(0.5)
            if _last_qr != last_sent and _last_qr is not None:
                yield f"data: {_last_qr}\n\n"
                last_sent = _last_qr
    return Response(event_stream(), mimetype="text/event-stream")

@app.route("/api/employee-skills", methods=["POST"])
def save_skills():
    data = request.get_json()
    print("Received skills:", data)
    # Save to DB or file...
    return jsonify({"status": "ok"})


@app.route("/api/free-locations")
def get_free_locations():
    result = get_free_locations()
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "No free locations"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
