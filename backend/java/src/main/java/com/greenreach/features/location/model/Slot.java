package com.greenreach.features.location.model;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.greenreach.features.plantTray.Tray;

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
@Table(name = "slots", indexes = {@Index(name = "idx_slot_code", columnList = "slot_code")})
@AttributeOverrides({
  // override the inherited `id` field to use room_id
  @AttributeOverride(
    name = "id",
    column = @Column(name = "slot_id", updatable = false, nullable = false)
  ),
  // override the inherited `code` field to use room_code
  @AttributeOverride(
    name = "code",
    column = @Column(name = "slot_code", nullable = false, unique = true)
  )
})
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
    @Column(name = "slot_code", unique = true, nullable = false)
    private String code;

    /*
     * Status for if the slot is occupied or not: 1 denotes occupied, 0 denotes unoccupied
     * Default is 0, unoccupied
     */
    @Column(name = "slot_occupancy", nullable = false)
    private Integer occupied = 0;

    /*
     * The litteral alphanumeric string suffic scanned for this slot
     * Ex. LOC-01-01-02-FSDFJ32JKJFS, FSDFJ32JKJFS is the slot_qr
     */
    @Column(name = "slot_index", nullable = false)
    private Integer slotIndex;

    /**
     * Mapping for the slot to its level
     */
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "level_id", nullable = false)
    private Level level;

    /**
     * Mapping for the slot to the tray it contains. 
     */
    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "tray_id", referencedColumnName = "tray_id")
    private Tray tray;


    public Slot(){}

    private Slot(Level level, String code, Integer occupied, Integer slotIndex){
        this.code = code;
        this.occupied = occupied;
    }

    public boolean isOccupied() {
        return this.occupied == 1;
    }


    public Long getId(){
        return this.id;
    }
    public String getCode(){
        return this.code;
    }

    public Tray getTray(){
        return this.tray;
    }

    public Level getLevel(){
        return this.level;
    }

    public void setTray(Tray tray){
        this.tray = tray;
    }


    public void slotIndex(Integer slotIndex){
        this.slotIndex = slotIndex;
    }
    /**
     * Builds and returns a new Slot instance with the configured values.
     *
     * @return SlotBuilder - the constructed Slot object
     */
    public static SlotBuilder builder(Level level) {
        return new SlotBuilder(level);
    }

    public static class SlotBuilder{
        private String code;
        private Integer occupied;
        private Level level;
        private Integer slotIndex;

        private SlotBuilder(Level level) {
            this.level = level;
        }

        public SlotBuilder setCode(String code){
            this.code = code;
            return this;
        }

        public SlotBuilder setSlotIndex(Integer slotIndex){
            this.slotIndex = slotIndex;
            return this;
        }
        public SlotBuilder setOccupancy(Integer occupied){
            this.occupied = occupied;
            return this;
        }
        public Slot build(){
            return new Slot(level, code, occupied, slotIndex);
        }
    }
}
