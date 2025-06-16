from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

_last_tray_qr = None
_last_location_qr = None

#----------------------
# Tray Endpoints
#----------------------
@app.route('/tray', methods=['POST'])
def handle_tray():
    global _last_tray_qr
    data = request.get_json() or {}
    code = data.get('code')
    if not code:
        return jsonify({'error': 'Missing code'}), 400
    _last_tray_qr = code
    app.logger.info(f"[SCAN] Tray scanned: {code}")
    return jsonify({'message': f"Tray scanned: {code}"}), 200

@app.route('/reset/tray', methods=['POST'])
def reset_tray():
    global _last_tray_qr
    _last_tray_qr = None
    return '', 204

@app.route('/stream/tray')
def stream_tray():
    def event_stream():
        last_sent = None
        while True:
            time.sleep(0.5)
            if _last_tray_qr and _last_tray_qr != last_sent:
                yield f"data: {_last_tray_qr}\n\n"
                last_sent = _last_tray_qr
    return Response(event_stream(), mimetype='text/event-stream')

# Alias for original tray route names (if needed)
@app.route('/reset_qr', methods=['POST'])
def reset_qr_alias():
    return reset_tray()

@app.route('/stream', methods=['GET'])
def stream_alias():
    return stream_tray()

#----------------------
# Location Endpoints
#----------------------
@app.route('/location', methods=['POST'])
def handle_location():
    global _last_location_qr
    data = request.get_json() or {}
    code = data.get('code')
    if not code:
        return jsonify({'error': 'Missing code'}), 400
    _last_location_qr = code
    app.logger.info(f"[SCAN] Location scanned: {code}")
    return jsonify({'message': f"Location scanned: {code}"}), 200

@app.route('/location_q', methods=['POST'])
def reset_location():
    global _last_location_qr
    _last_location_qr = None
    return '', 204

@app.route('/stream/location', methods=['GET'])
def stream_location():
    def event_stream():
        last_sent = None
        while True:
            time.sleep(0.5)
            if _last_location_qr and _last_location_qr != last_sent:
                yield f"data: {_last_location_qr}\n\n"
                last_sent = _last_location_qr
    return Response(event_stream(), mimetype='text/event-stream')

# Aliases for original location route names
@app.route('/location_qr', methods=['POST'])
def reset_location_qr_alias():
    return reset_location()

@app.route('/receiveLocationQR', methods=['GET'])
def receive_location_qr_alias():
    return stream_location()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
