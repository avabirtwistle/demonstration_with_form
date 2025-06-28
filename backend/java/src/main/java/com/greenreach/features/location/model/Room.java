package com.greenreach.features.location.model;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@AttributeOverrides({
  // override the inherited `id` field to use room_id
  @AttributeOverride(
    name = "id",
    column = @Column(name = "room_id", updatable = false, nullable = false)
  ),
  // override the inherited `code` field to use room_code
  @AttributeOverride(
    name = "code",
    column = @Column(name = "room_code", nullable = false, unique = true)
  )
})
public class Room extends Locatable {
 
    protected Room(){
        super();
    }
    public Room(String code){
        super(code);
    }

    /**
     * Maps this room to the zones contained within it
     */
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Zone> zones;


    public List<Zone> getZones() {
        return zones;
    }

    /**
     * Builds and returns a new Room instance with the configured values.
     *
     * @return RoomBuilder -the constructed Room object
     */
    public static RoomBuilder builder() {
        return new RoomBuilder();
    }

    public static class RoomBuilder {
        private String code;

        public RoomBuilder code(String code) {
            this.code = code;
            return this;
        }

        public Room build() {
            return new Room(code);
        }

        public RoomBuilder setCode(String code) {
            this.code = code;
            return this;
        }
    }
}