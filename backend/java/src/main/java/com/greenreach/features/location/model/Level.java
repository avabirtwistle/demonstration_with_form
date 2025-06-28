package com.greenreach.features.location.model;

import javax.persistence.Table;

import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

/**
 * Represents a vertical level (shelf) within a rack.
 * Each level can hold multiple slots where plants are grown.
 */
@Entity
@Table(name = "levels", indexes = {@Index(name = "idx_level_code", columnList = "level_code")})
@AttributeOverrides({
  //override id with level_id
  @AttributeOverride(
    name = "id",
    column = @Column(name = "level_id", updatable = false, nullable = false)
  ),
  //Override the code field with level_code
  @AttributeOverride(
    name = "code",
    column = @Column(name = "level_code", nullable = false)
  )
})
public class Level extends Locatable {

    /**
     * The number of slots on the level
     */
    @Column(name = "num_slots", nullable = false)
    private Integer numSlots = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rack_id", nullable = false)
    private Rack rack;

    @OneToMany(mappedBy = "level", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Slot> slots;

    /**
     * Required by JPA
     */
    protected Level() {
        super();
    }


    /**
     * Private constructor for use with builder
     */
    private Level(String code, Rack rack) {
        super(code);
        this.rack = rack;
    }

    public static LevelBuilder builder(Rack rack) {
        return new LevelBuilder().setRack(rack);
    }

    public static class LevelBuilder {
        private String code;
        private Rack rack;

        public LevelBuilder setCode(String code) {
            this.code = code;
            return this;
        }

        public LevelBuilder setRack(Rack rack) {
            this.rack = rack;
            return this;
        }

        public Level build() {
            return new Level(code, rack);
        }
    }

    public Rack getRack() {
        return rack;
    }

    public List<Slot> getSlots() {
        return slots;
    }

    public void setSlots(List<Slot> slots) {
        this.slots = slots;
    }

    public void setRack(Rack rack) {
        this.rack = rack;
    }

    public void incrementSlots() {
        numSlots = numSlots +1;
    }

}
