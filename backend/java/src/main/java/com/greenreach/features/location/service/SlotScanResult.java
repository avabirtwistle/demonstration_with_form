package com.greenreach.features.location.service;

import java.time.LocalDate;

import com.greenreach.features.plantTray.TrayStatus;

public record SlotScanResult(
    String code,
    LocalDate plantDate,
    String plantName,
    TrayStatus plantStatus,
    int currentStageIndex,
    int daysUntilHarvest,
    LocalDate estimatedHarvestDate
) {}

