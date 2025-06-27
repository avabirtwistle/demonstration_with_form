package com.greenreach.features.location.service;

import java.time.LocalDate;

import com.greenreach.features.plantTray.TrayStatus;

public record SlotScanResult(
    String code,
    LocalDate planDate,
    String plantName,
    TrayStatus planStatus,
    int currentStageIndex,
    int daysUntilHarvest,
    LocalDate estimatedHarvestDate
) {}

