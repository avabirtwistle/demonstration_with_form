package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;
import com.greenreach.features.plantTray.Tray;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class SlotScanService {

    private final SlotRepository slotRepository;

    public SlotScanService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public SlotScanResult getSlotScanResult(String code) {
        Slot slot = slotRepository.findByQr(code)
            .orElseThrow(() -> new RuntimeException("Slot not found"));

        Tray tray = slot.getTray();
        boolean occupied = tray != null;

        String currentStage = occupied ? tray.getPlantStage() : null;

        int daysUntilHarvest = -1;
        if (occupied && tray.getEstimatedHarvestDate() != null) {
            daysUntilHarvest = (int) ChronoUnit.DAYS.between(
                LocalDate.now(),
                tray.getEstimatedHarvestDate()
            );
        }

        List<String> remainingStages = List.of();
        if (occupied && tray.getPlantType() != null) {
            List<String> allStages = tray.getPlantType().getStageNames();
            int index = allStages.indexOf(currentStage);
            if (index >= 0 && index < allStages.size() - 1) {
                remainingStages = allStages.subList(index + 1, allStages.size());
            }
        }

        return new SlotScanResult(
            slot.getQR(),
            occupied,
            currentStage,
            daysUntilHarvest,
            remainingStages
        );
    }
}
