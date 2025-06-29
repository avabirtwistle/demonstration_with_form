package com.greenreach.features.location.model;

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
import javax.persistence.Table;

/**
 * Rack is a class for creating the rack component of the system which belongs to a zone. 
 * <p>
 * A {@code Rack} must be associated with an existing room and zone to ensure that 
 * environmental data can be properly managed and contextualized.
 *
 * @author Ava Birtwistle
 * @version 1.0
 * @since 2025-06-19
 */
@Entity
@Table(name = "racks", indexes = {@Index(name = "idx_rack_code", columnList = "rack_code")})
public class Rack {

    /**
     * Primary key for the rack. Automatically generated.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rack_id")
    private Long id; //Long is a reference type (not primitive type) so it can be null
    
    /**
     * Unique identifier for the rack, e.g., "RACK-01", typically derived from a QR code.
     */
    @Column(name = "rack_code", nullable = false, unique = true) 
    private String code;

    /**
     * Number of vertical levels (shelves) in the rack.
     */
    @Column(nullable = false)
    private Integer numLevels = 0;

    /**
     * Number of slots remaining on this rack. Derived from the number of availble slots vs occupied ones
     * in the levels list.
     */
    @Column(nullable = false)
    private Integer spotsRemaining = 0;

    /**
    * The zone this rack belongs to.
    */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "zone_id", nullable = false)
    private Zone zone;


    /**
     * The levels which are on this rack
     */
    @OneToMany(mappedBy = "rack", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Level> levels; 

    /**
     * Default constructor required by JPA.
     */
    protected Rack() {} //for JPA

    /**
     * Constructs a {@code Rack} with the specified code and number of levels.
     *
     * @param code the unique rack code
     * @param num_levels the number of levels in the rack
     */
    private Rack(Zone zone, String code, Integer numLevels){
        this.zone = zone;
        this.code = code;
        this.numLevels = numLevels;
    }

    /**
     * Builds and returns a new Rack instance with the configured values.
     *
     * @return the constructed Rack object
     */
    public static RackBuilder builder(Zone zone){
        return new RackBuilder(zone);
    }

    /**
     * Builder class for constructing Rack instances.
     */
    public static class RackBuilder {
        private String code;
        private Integer numLevels = 0;
        private Zone zone;
        
        private RackBuilder(Zone zone){
            this.zone = zone;
        }
        /**
         * Sets the rack code.
         *
         * @param code the unique identifier for the rack
         * @return the current RackBuilder instance
         */
        public RackBuilder setCode(final String code){
            this.code = code;
            return this;
        }

        /**
         * Sets the number of levels in the rack.
         *
         * @param numLevels the number of vertical levels
         * @return the current RackBuilder instance
         */
        public RackBuilder setNumLevels(final Integer numLevels){
            this.numLevels = numLevels;
            return this;
        }

         /**
         * Builds and returns a new Rack instance.
         *
         * @return a new Rack with the configured properties
         */
        public Rack build() {
            return new Rack(zone, code, numLevels);
        }
    }
    public String getCode() {
    return code;
    }

    public Integer getNumLevels() {
        return numLevels;
    }

    public Integer getSpotsRemaining() {
        return spotsRemaining;//TODO: Possibly need to itterate through the levels and might want to invoke on case by case basis
    }

    public Long getId() {
        return id;
    }

    public Zone getZone() {
        return zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }

    public List<Level> getLevels() {
        return levels;
    }
    public void incrementLevels() {
        this.numLevels += 1;
    }
}
