package com.greenreach.features.plantTray;

import javax.persistence.*;
import java.time.LocalDate;

import com.greenreach.features.Plants.PlantType;
import com.greenreach.features.location.model.Slot;

/**
 * Represents a tray of plants placed into a slot on a rack level.
 * Contains information about plant type, grow schedule, and unique ID.
 */
@Entity
@Table(name = "trays")
public class Tray {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tray_id")
    private Long id;

    /**
     * Unique alphanumeric tray QR suffix (e.g., for LOC-01-01-02-TRAYABC123)
     */
    @Column(name = "tray_qr", nullable = false, unique = true)
    private String code;

    /**
     * What plant is growing in the tray (e.g., basil, lettuce)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plant_type_id")
    private PlantType plantType;


    /**
     * Date the tray was planted (used for scheduling and alerts)
     */
    @Column(name = "planted_date", nullable = false)
    private LocalDate plantedDate;

    /**
     * Estimated harvest date based on crop duration
     */
    @Column(name = "harvest_estimate")
    private LocalDate harvestEstimate;

    /**
     * Slot where the tray is currently placed (one-to-one)
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slot_id", referencedColumnName = "slot_id")
    private Slot slot;

    protected Tray() {}

    public Tray(String code, PlantType plantType, LocalDate plantedDate, LocalDate harvestEstimate, Slot slot) {
        this.code = code;
        this.plantType = plantType;
        this.plantedDate = plantedDate;
        this.harvestEstimate = harvestEstimate;
        this.slot = slot;
    }

    // Getters
    public Long getId() { 
        return id; 
    }
    public String getQr() { 
        return code; 
    }
    public PlantType getPlantType() { 
        return plantType; 
    }
    public LocalDate getPlantedDate() {
         return plantedDate; 
        }
    public LocalDate getHarvestEstimate() { 
        return harvestEstimate; 
    }
    public Slot getSlot() { 
        return slot;
     }

    public static TrayBuilder builder() {
        return new TrayBuilder();
    }

    public static class TrayBuilder {
        private String code;
        private PlantType plantType;
        private LocalDate plantedDate;
        private LocalDate harvestEstimate;
        private Slot slot;

        public TrayBuilder code(String code) {
            this.code = code;
            return this;
        }

        public TrayBuilder plantType(PlantType plantType) {
            this.plantType = plantType;
            return this;
        }

        public TrayBuilder plantedDate(LocalDate plantedDate) {
            this.plantedDate = plantedDate;
            return this;
        }

        public TrayBuilder harvestEstimate(LocalDate harvestEstimate) {
            this.harvestEstimate = harvestEstimate;
            return this;
        }

        public TrayBuilder slot(Slot slot) {
            this.slot = slot;
            return this;
        }

        public Tray build() {
            return new Tray(code, plantType, plantedDate, harvestEstimate, slot);
        }
    }
}
