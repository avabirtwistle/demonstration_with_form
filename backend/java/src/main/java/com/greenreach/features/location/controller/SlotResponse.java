package com.greenreach.features.location.controller;

/**
 * A simple DTO for returning slot metadata in the scan response.
 */
import java.time.LocalDate;

import com.greenreach.features.plantTray.TrayStatus;

public record SlotResponse(
    Long      id,
    String    qrSuffix,
    Integer   slotIndex,
    String    roomCode,
    String    zoneCode,
    String    rackCode,
    String    levelCode,
    boolean   occupied,        // tells the client if there’s a tray
    String    plantTypeName,   // only populated when occupied==true
    LocalDate plantedDate,    
    TrayStatus    status,
    Integer   currentStageIndex,
    Integer   daysToHarvest,
    LocalDate   harvestEstimate
) {}