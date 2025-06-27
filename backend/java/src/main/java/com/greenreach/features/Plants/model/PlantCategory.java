package com.greenreach.features.plants.model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 * Represents a high-level plant category (e.g., Greens).
 * Inherits common fields from Plantable and overrides column mappings.
 */
@Entity
@Table(name = "plant_category")
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "category_id", updatable = false, nullable = false)),
    @AttributeOverride(name = "name", column = @Column(name = "category_name", nullable = false, unique = true))
})
public class PlantCategory extends Plantable {

    /** Growth stages specific to this category. */
    @OneToMany(mappedBy = "plantable", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<PlantableGrowthStage> growthStages = new ArrayList<>();

    /** Subcategories under this plant category. */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<PlantSubCategory> subcategories = new ArrayList<>();

    /** Default constructor for JPA */
    protected PlantCategory() {
        super();
    }

    /**
     * Constructs a PlantCategory with a name, cycle count, and initial stages.
     */
    public PlantCategory(String name, Integer cycles, List<PlantableGrowthStage> growthStages) {
        super(name, cycles, growthStages);
    }

    /**
     * Adds a growth stage to this category and sets its back-reference.
     */
    @Override
    public void addStage(PlantableGrowthStage stage) {
        stage.setPlantable(this);
        growthStages.add(stage);
    }

    /**
     * Removes a growth stage from this category.
     */
    @Override
    public void removeStage(PlantableGrowthStage stage) {
        stage.setPlantable(null);
        growthStages.remove(stage);
    }

    /** Returns an unmodifiable view of this category's stages. */
    public List<PlantableGrowthStage> getGrowthStages() {
        return List.copyOf(growthStages);
    }

    /** Returns an unmodifiable view of this category's subcategories. */
    public List<PlantSubCategory> getSubcategories() {
        return List.copyOf(subcategories);
    }

    /** Updates the category's name. */
    @Override
    public void setName(String name) {
        super.setName(name);
    }
}
