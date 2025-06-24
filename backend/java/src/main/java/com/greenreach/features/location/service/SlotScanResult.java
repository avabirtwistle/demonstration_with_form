package com.greenreach.features.location.service;

import java.util.List;

public record SlotScanResult(
    String code,
    boolean occupied,
    String currentStage,
    int daysUntilHarvest,
    List<String> remainingStages
) {}

