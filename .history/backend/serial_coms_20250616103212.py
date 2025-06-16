import serial
import threading
import time

# — Serial setup — 
BT_PORT = "/dev/cu.usbserial-210"   # ← update to your port
BT_BAUD = 115200

def start_serial(): 
    try:
        ser = serial.Serial(BT_PORT, BT_BAUD, timeout=1)
        time.sleep(2)  # allow ESP32 to reboot
        print(f"Opened serial on {BT_PORT}@{BT_BAUD}")
    except Exception as e:
        print("Serial port error:", e)
        ser = None

    serial_lock = threading.Lock()