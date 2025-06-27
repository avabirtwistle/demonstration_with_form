package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;
import com.greenreach.features.plantTray.Tray;
import com.greenreach.features.plantTray.TrayService;
import com.greenreach.features.location.service.SlotScanResult;
import com.greenreach.features.plants.model.PlantableGrowthStage;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

/**
 * Service to scan a slot and return tray/growth-stage information.
 */
@Service
public class SlotScanService {

    private final SlotRepository slotRepository;
    private final TrayService trayService;

    public SlotScanService(SlotRepository slotRepository, TrayService trayService) {
        this.slotRepository = slotRepository;
        this.trayService = trayService;

    }

    private Slot slotExists(String code){
        return slotRepository.findByCode(code)
            .orElseThrow(() -> new RuntimeException("Slot not found"));
    }

    /*Returns the slot info or it throws an exception if unoccupied*/
    public SlotScanResult getSlotScanResult(String code) {
        Slot slot = slotExists(code);

        /*Retrieve the tray in the slot so we can get  */
        Tray tray = slot.getTray();

        Integer stage = slot.getTray().getCurrentStageIndex();

        return new SlotScanResult(
            slot.getCode(),
            tray.getPlantedDate(),
            tray.getPlantType().getName(),
            tray.getStatus(),
            stage,
            tray.getDaysToHarvest(),
            tray.getHarvestEstimate()
        );
    }
}
