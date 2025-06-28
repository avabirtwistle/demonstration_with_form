package com.greenreach.features.plants.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Abstract base for any plantable entity: categories, subcategories, or types.
 * Defines common fields and growth stage relationship.
 */
@Entity
@Table(name = "plantable")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Plantable {

    /** Primary key for all plantable items */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    /** Common name of this plantable item */
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    /** Harvest cycles before replacement */
    @Column(name = "harvest_cycles", nullable = false)
    private Integer cycles = 1;

    /** Protected constructor for JPA */
    protected Plantable() {}

    /** Constructs a Plantable with name and cycle count; initial stages added via addStage(). */
    protected Plantable(String name, Integer cycles) {
        this.name = name;
        this.cycles = cycles;
    }

    /* Getters and setters */
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getCycles() {
        return cycles;
    }
    public void setCycles(Integer cycles) {
        this.cycles = cycles;
    }



}
