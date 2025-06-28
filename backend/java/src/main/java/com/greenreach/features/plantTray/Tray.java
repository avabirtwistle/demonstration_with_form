package com.greenreach.features.plantTray;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.plants.model.PlantType;
import com.greenreach.features.plants.model.PlantableGrowthStage;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * Represents a tray with a unique QR code that can be filled with plants.
 * Tracks plant type, growth dates, assigned slot, and lifecycle status.
 */
@Entity
@Table(name = "trays", indexes = {
    @Index(name = "tray_status", columnList = "status"),
    @Index(name = "next_stage", columnList = "next_stage_date")
})
public class Tray {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tray_id")
    private Long id;

    @Column(name = "tray_qr", nullable = false, unique = true)
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plant_type_id", nullable = false)
    private PlantType plantType;

    @Column(name = "planted_date", nullable = false)
    private LocalDate plantedDate;

    @Column(name = "harvest_estimate")
    private LocalDate harvestEstimate;

    /**
     * Persisted index of the current growth stage: -1 = none, 0..n
     */
    @Column(name = "current_stage_index", nullable = false)
    private int currentStageIndex = -1;

    /**
     * Timestamp for when the tray was first registered in the system.
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "next_stage_date")
    private LocalDate nextStageDate;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    /*If a tray is in a slot */
    @OneToOne(mappedBy = "tray", fetch = FetchType.LAZY)
    private Slot slot;

    /*The status of what the tray is, used when verifying if we can plant in a tray. See PlantStatus.java */
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TrayStatus status = TrayStatus.UNASSIGNED;

    /**
     * Required by JPA.
     */
    protected Tray() {}

    /**
     * Minimal constructor for unassigned trays.
     */
    public Tray(String code) {
        this.code = code;
        this.plantedDate = LocalDate.EPOCH;
        this.harvestEstimate = LocalDate.EPOCH;
        this.status = TrayStatus.UNASSIGNED;    //Indicate the tray is available for planting
    }

    /**
     * Full constructor for assigned trays.
     */
    public Tray(String code,
                PlantType plantType,
                LocalDate plantedDate //TODO: fix the constructors 
                ) {
        this.code = code;
        this.plantType = plantType;
        this.plantedDate = plantedDate;
        this.harvestEstimate = setHarvestEstimate();
        this.currentStageIndex = 0;
        this.status = TrayStatus.SEEDED; //Indicate the tray is in use
        this.nextStageDate = plantedDate.plusDays(getCurrentGrowthStage().getDurationDays());
    }

    public void overwriteTray(PlantType plantType, LocalDate date){
        this.plantType = plantType;
        this.plantedDate = date;
        this.harvestEstimate = setHarvestEstimate();
        this.currentStageIndex = 0;
        this.status = TrayStatus.SEEDED;
        this.nextStageDate = plantedDate.plusDays(getCurrentGrowthStage().getDurationDays());
        this.slot = null;
    }

    private LocalDate setHarvestEstimate(){
        return plantedDate.plusDays((long)Math.ceil(plantType.getTotalDays()));
    }


    // Getters
    public Long getId() { return id; }
    public String getCode() { return code; }
    public PlantType getPlantType() { return plantType; }
    public LocalDate getPlantedDate() { return plantedDate; }
    public LocalDate getHarvestEstimate() { return harvestEstimate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Slot getSlot() { return slot; }
    public TrayStatus getStatus() { return status; }
    public int getCurrentStageIndex() { return currentStageIndex; }

    public PlantableGrowthStage getCurrentGrowthStage(){
        return plantType.getGrowthStages().get(getCurrentStageIndex());

    }

    /**
     * Days remaining until this tray should advance.
     * Positive = days left, zero = due today, negative = overdue.
     */
    public int getDaysToNext() {
        return (int) ChronoUnit.DAYS.between(LocalDate.now(), nextStageDate);
    }

    
    /**
     * Computes the days until the plant can be harvested
     */
    public int getDaysToHarvest() {
        return (int) ChronoUnit.DAYS.between(LocalDate.now(), harvestEstimate);
    }
    
    /**
     * Increment
     */
    public void incrementCurrentStageIndex() {
        int last = plantType.getGrowthStages().size() - 1;

        if (currentStageIndex < last) {
            currentStageIndex++;

            // new current stage
            this.nextStageDate = LocalDate.now().plusDays(getCurrentGrowthStage().getDurationDays());
        } else {
            status = TrayStatus.READY;
        }
    }

    public static TrayBuilder builder() { return new TrayBuilder(); }
    //TODO: evaluate the tray builder and clean up
    public static class TrayBuilder {
        private String code;
        private PlantType plantType;
        private LocalDate plantedDate;

        public TrayBuilder code(String code) {
            this.code = code; return this;
        }
        public TrayBuilder plantType(PlantType plantType) {
            this.plantType = plantType; return this;
        }
        public TrayBuilder plantedDate(LocalDate plantedDate) {
            this.plantedDate = plantedDate; return this;
        }

        public Tray build() {
            return new Tray(code, plantType, plantedDate);
        }
    }
}
