package com.greenreach.features.Plants;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "plant_type")
public class PlantType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    /**
     * The growth stages for this specific plant type
     */
    @OneToMany(mappedBy = "plantType")
    private List<CategoryGrowthStage> stages;

    /**
     * The parent subcategory this plantType belongs to.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id", nullable = false)
    private PlantSubCategory subCategory;

    // Constructors
    public PlantType() {}

    public PlantType(String name, String description) {
        this.name = name;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }
}

