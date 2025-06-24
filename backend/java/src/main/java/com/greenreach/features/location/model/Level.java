package com.greenreach.features.location.model;

import javax.persistence.Table;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "level_id", nullable = false)
    private Long id;

    @Column(name = "level_code", nullable = false, unique = true)
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rack_id", nullable = false)
    private Rack rack;

    @OneToMany(mappedBy = "level", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Slot> slots;

    /**
     * Required by JPA
     */
    protected Level() {}

    /**
     * Private constructor for use with builder
     */
    private Level(String code, Rack rack) {
        this.code = code;
        this.rack = rack;
    }

    public static LevelBuilder builder() {
        return new LevelBuilder();
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

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
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

    public void setCode(String code) {
        this.code = code;
    }

    public void setRack(Rack rack) {
        this.rack = rack;
    }
}
