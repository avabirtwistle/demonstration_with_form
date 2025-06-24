package com.greenreach.features.location.model;

import javax.persistence.Table;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

/**
 * Represents a specific sub-area within a Room.
 * Zones help organize racks or environmental control units within a Room.
 *
 * Mapped to the "zones" table in the database.
 */
@Entity
@Table(name = "zones", indexes = {@Index(name = "idx_zone_code", columnList = "zone_code")})
public class Zone {

    /**
     * Primary Key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zone_id")
    private Long id;

    /**
     * Code id for the Zone; obtained from the QR code
     */
    @Column(name = "zone_code", nullable = false, unique = true)
    private String code;

    /**
     * The zone to which this rack belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    /**
     * Racks which belong to this Zone
     */
    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Rack> racks;

    /**
     * Constructor required by JPA
     */
    protected Zone() {}

    /**
     * Private constructor for the builder
     */
    private Zone(String code, Room room) {
        this.code = code;
        this.room = room;
    }

    /**
     * Builder to create a new ZoneBuilder for constructing Zone objects
     *
     * @return a new instance of ZoneBuilder
     */
    public static ZoneBuilder builder() {
        return new ZoneBuilder();
    }

    public static class ZoneBuilder {
        private String code;
        private Room room;

        public ZoneBuilder setCode(String code) {
            this.code = code;
            return this;
        }

        public ZoneBuilder setRoom(Room room) {
            this.room = room;
            return this;
        }

        public Zone build() {
            return new Zone(code, room);
        }
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public Room getRoom() {
        return room;
    }

    public List<Rack> getRacks() {
        return racks;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public void setRacks(List<Rack> racks) {
        this.racks = racks;
    }
}
