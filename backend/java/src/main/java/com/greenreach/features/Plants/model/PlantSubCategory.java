package com.greenreach.features.plants.model;

import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 * Represents a mid-level plant grouping (e.g., Lettuce) under a category.
 * Inherits common fields and growth-stage mapping from Plantable.
 */
@Entity
@Table(name = "plant_subcategory")
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "subcategory_id", updatable = false, nullable = false)),
    @AttributeOverride(name = "name", column = @Column(name = "subcategory_name", nullable = false, unique = true))
})
public class PlantSubCategory extends Plantable {

    /** The parent category for this subcategory. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private PlantCategory category;

    /** Varieties under this subcategory. */
    @OneToMany(mappedBy = "subcategory", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<PlantType> types;

    /** Default constructor for JPA. */
    protected PlantSubCategory() {
        super();
    }

    /**
     * Constructs a subcategory with a name and parent category.
     * Inherits the category's cycles and clones its stages.
     */
    public PlantSubCategory(String name, PlantCategory category) {
        super(name, category.getCycles(), category.getStages());
        this.category = category;
    }

    /**
     * Constructs a subcategory with full details including custom stages.
     */
    public PlantSubCategory(String name, Integer cycles, PlantCategory category, List<PlantableGrowthStage> customStages) {
        super(name, cycles, customStages);
        this.category = category;
    }

    /**
     * Returns an unmodifiable list of growth stages for this subcategory.
     */
    public List<PlantableGrowthStage> getGrowthStages() {
        return getStages();
    }

    /**
     * Returns an unmodifiable list of plant types under this subcategory.
     */
    public List<PlantType> getTypes() {
        return List.copyOf(types);
    }

    /**
     * Gets the parent category.
     */
    public PlantCategory getCategory() {
        return category;
    }

    /**
     * Updates the parent category reference.
     */
    public void setCategory(PlantCategory category) {
        this.category = category;
    }

    /**
     * Updates the subcategory name.
     */
    @Override
    public void setName(String name) {
        super.setName(name);
    }
}
