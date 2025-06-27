package com.greenreach.features.plantTray;

public enum TrayStatus {
    UNASSIGNED, //this tray is not currently in the system and can be planted in
    SEEDED, //Tray is not yet placed in the system, slot is null
    PLACED, //the tray is currently placed in the system growing
    RESERVED,   //Unsure if this is needed 
    READY   //the tray is ready to be harvested
}
