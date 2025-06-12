import os
import sqlite3

DB_FILE = "demonstration_log.db"
SQL_FILE = "seed_plants.sql"

if os.path.exists(DB_FILE):
    os.remove(DB_FILE)

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

#**************************Database Table Configurations***************************************
#Define plant categories 
cursor.execute("""
CREATE TABLE plant_categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name      TEXT    UNIQUE NOT NULL
)
""")

#Define plant types and their stage durations
cursor.execute("""
CREATE TABLE plants (
    plant_id        INTEGER PRIMARY KEY AUTOINCREMENT,
    plant_name      TEXT    UNIQUE NOT NULL,
    parent_category INTEGER NOT NULL,
    plant_subcat    Text    NOT NULL DEFAULT 'Generic',
    days_germ       INTEGER NOT NULL DEFAULT 0,
    days_seedling   INTEGER NOT NULL DEFAULT 0,
    days_veg        INTEGER NOT NULL DEFAULT 0,
    days_flower     INTEGER NOT NULL DEFAULT 0,
    harvest_cycles  INTEGER NOT NULL DEFAULT 0, 
    days_between    INTEGER NOT NULL DEFAULT 0,             
    FOREIGN KEY (parent_category) REFERENCES plant_categories(category_id)      
)
""")

#Racks
cursor.execute("""
CREATE TABLE rack (
    rack_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    rack_qr_id  TEXT    UNIQUE NOT NULL
)
""")

#Levels belong to racks
cursor.execute("""
CREATE TABLE level (
    level_id    INTEGER PRIMARY KEY AUTOINCREMENT,
    level_qr_id TEXT    UNIQUE NOT NULL,
    rack_id     INTEGER NOT NULL,
    level_num   INTEGER NOT NULL,
    FOREIGN KEY (rack_id) REFERENCES rack(rack_id)
)
""")

#Slots belong to levels
cursor.execute("""
CREATE TABLE slot_index (
    slot_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    slot_qr_code    TEXT    UNIQUE NOT NULL,
    level_id        INTEGER NOT NULL,
    slot_number     INTEGER NOT NULL,
    occupied        INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (level_id) REFERENCES level(level_id),
    UNIQUE (level_id, slot_number)
)
""")

#Trays go into slots and reference plant types
cursor.execute("""
CREATE TABLE tray (
    tray_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    tray_qr_code    TEXT    UNIQUE NOT NULL,
    slot_id         INTEGER NOT NULL,
    plant_type_id   INTEGER NOT NULL,
    start_date      DATE    NOT NULL,
    days_remaining  INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (slot_id)       REFERENCES slot_index(slot_id),
    FOREIGN KEY (plant_type_id) REFERENCES plant_type(plant_type_id)
)
""")
#Put the new tables into the database
conn.commit()
#**************************Plant Data Configuration***************************************
#Open the seed data file as read
with open(SQL_FILE, "r") as f:
    seed_sql = f.read()

#Execute multiple sql statements into database
cursor.executescript(seed_sql)
conn.commit()

#Finished
conn.close()
