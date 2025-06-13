import sqlite3

DB_FILE = "demonstration_log.db"

def get_connection():
    return sqlite3.connect(DB_FILE)

def get_free_space():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            s.slot_id,
            s.slot_qr_code,
            s.slot_number,
            s.occupied,
            l.level_id,
            l.level_qr_id,
            l.level_num,
            r.rack_id,
            r.rack_qr_id
        FROM slot_index s
        JOIN level l ON s.level_id = l.level_id
        JOIN rack r ON l.rack_id = r.rack_id
        WHERE s.occupied = 0
        ORDER BY RANDOM()
        LIMIT 1;
    """)

    row = cursor.fetchone()
    conn.close()

    if row:
        return {
            "slot_id": row[0],
            "slot_qr_code": row[1],
            "slot_number": row[2],
            "occupied": row[3],
            "level_id": row[4],
            "level_qr_id": row[5],
            "level_num": row[6],
            "rack_id": row[7],
            "rack_qr_id": row[8]
        }
    else:
        return None

