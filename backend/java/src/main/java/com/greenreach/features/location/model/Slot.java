package com.greenreach.features.location.model;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Represents a slot on the level of a rack which is where a filled plant tray can be placed. Used for
 * planning grow schedules, determing inventory location and data operations. Only one tray containing
 * one plant type may be place in the slot at a given time. 
 * <p>
 * Mapped to the "slots" table in the database.
 *
 * @author Ava Birtwistle
 * @version 1.0
 * @since 2025-06-19
 */
@Entity
@Table(name = "slots")
public class Slot {

    /*
     * The primary key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slot_id")
    private Long id;

    /*
     * The litteral alphanumeric string suffic scanned for this slot
     * Ex. LOC-01-01-02-FSDFJ32JKJFS, FSDFJ32JKJFS is the slot_qr
     */
    @Column(name = "slot_qr", unique = true, nullable = false)
    private String qr;

    /*
     * Status for if the slot is occupied or not: 1 denotes occupied, 0 denotes unoccupied
     * Default is 0, unoccupied
     */
    @Column(name = "slot_occupancy", nullable = false)
    private Integer occupied = 0;

    @OneToOne(mappedBy = "slot", fetch = FetchType.LAZY)
    private Tray tray;

    private Slot(){}

    private Slot(String qr, Integer occupied){
        this.qr = qr;
    }

    public boolean isOccupied() {
        return this.occupied == 1;
    }

    public String getQR() {
        return this.qr;
    }

    public Long getId(){
        return this.id;
    }

    /**
     * Builds and returns a new Slot instance with the configured values.
     *
     * @return SlotBuilder - the constructed Slot object
     */
    public static SlotBuilder builder() {
        return new SlotBuilder();
    }

    public static class SlotBuilder{
        private String qr;
        private Integer occupied;

        public SlotBuilder setQR(String qr){
            this.qr = qr;
            return this;
        }
        public SlotBuilder setOccupancy(Integer occupied){
            this.occupied = occupied;
            return this;
        }
        public Slot build(){
            return new Slot(qr, occupied);
        }
    }

}
