package com.greenreach.features.plantTray;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenreach.features.plants.model.PlantType;
import com.greenreach.features.plants.model.PlantableGrowthStage;



@Service
public class TrayService {
    private TrayRepository trayRepository;

    @Autowired
    protected TrayService(TrayRepository trayRepository){
        this.trayRepository = trayRepository;
    }

    /**
     * Creates tray that is not assigned to a slot
     */
    @Transactional
    public Tray createOrUpdateTray(String trayCode, PlantType plantType) {
        return trayRepository.findByCode(trayCode)
            .map(existingTray -> {
                if (existingTray.getStatus() != TrayStatus.UNASSIGNED) {
                    throw new IllegalStateException("Tray '" + trayCode + "' is currently in use.");
                }
                existingTray.overwriteTray(plantType, LocalDate.now());
                return trayRepository.save(existingTray); // optional due to @Transactional
            })
            .orElseGet(() -> {
                Tray newTray = new Tray(trayCode, plantType, LocalDate.now());
                return trayRepository.save(newTray);
            });
    }

    
    /**
     * Advances to the next growth stage if its duration has elapsed.
     * If the tray is in the last growth stage (Harvest), the status is 
     * changed to READY
     */
    @Transactional
    public int advanceStageIfReady() {
        LocalDate today = LocalDate.now();

        // 1. Find all trays that are due to advance and not already READY
        List<Tray> dueTrays = trayRepository.findByNextStageDateLessThanEqualAndStatusNot(
            today, TrayStatus.READY
        );

        // 2. Advance each tray
        for (Tray tray : dueTrays) {
            tray.incrementCurrentStageIndex(); // sets new nextStageDate or READY
        }

        // 3. Persist the updated trays in one batch
        trayRepository.saveAll(dueTrays);

        return dueTrays.size();
    }

    /**
     * Finds all the trays that have the status.
     */
    public Optional<List<Tray>> traysWithStatus(TrayStatus status){
        return trayRepository.findByStatus(status);
    }

    /**
     * Finds all of the ready trays
     */
    public Optional<List<Tray>> readyTrays(){
        return trayRepository.findByStatus(TrayStatus.READY);
    }

    /**
     * Creates tray that is not assigned to a slot
     */
}
