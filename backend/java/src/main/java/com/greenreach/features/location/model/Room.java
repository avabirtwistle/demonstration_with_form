package com.greenreach.features.location.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Index;
import java.util.List;

/**
 * Represents a physical room in the hydroponic grow system.
 * The room is the hierarchal, physically seperated with other rooms, and contains multiple zones, racks, levels and slots.
 * <p>
 * Mapped to the "rooms" table in the database.
 *
 * @author Ava Birtwistle
 * @version 1.0
 * @since 2025-06-19
 */
@Entity
@Table(name = "rooms", indexes = {@Index(name = "idx_room_code", columnList = "room_code")})
public class Room {

    /**
     * Primary key for the room. Automatically generated.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    /**
     * Unique identifier for the room, e.g., "ROOM-01", typically derived from a QR code.
     */
    @Column(name = "room_code", nullable = false, unique = true)
    private String code;    

    /**
     * Maps this room to the zones contained within it
     */
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Zone> zones;

    
    public List<Zone> getZones() {
        return zones;
    }

    public String getCode() {
        return code;
    }

    
    /**
     * Constructor used by builder.
     */
    private Room(String code) {
        this.code = code;
    }

    /**
     * Builds and returns a new Room instance with the configured values.
     *
     * @return RoomBuilder -the constructed Room object
     */
    public static RoomBuilder builder() {
        return new RoomBuilder();
    }

    /**
     * Builder class for constructing Room instances.
     */
    public static class RoomBuilder {
        private String code;

        public RoomBuilder setCode(String code) {
            this.code = code;
            return this;
        }

        public Room build() {
            return new Room(code);
        }
    }
}