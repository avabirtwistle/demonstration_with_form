package com.greenreach.features.plants.model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Represents a specific plant variety (e.g., Buttercrunch Lettuce) under a subcategory.
 * Inherits common fields from Plantable and overrides column mappings.
 */
@Entity
@Table(name = "plant_type")
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "type_id", updatable = false, nullable = false)),
    @AttributeOverride(name = "name", column = @Column(name = "type_name", nullable = false, unique = true))
})
public class PlantType extends Plantable {

    /** The parent subcategory for this plant type. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id", nullable = false)
    private PlantSubCategory subCategory;

    /** Growth stages specific to this plant type. */
    @OneToMany(mappedBy = "plantable", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<PlantableGrowthStage> growthStages = new ArrayList<>();

    /** Default constructor for JPA. */
    protected PlantType() {
        super();
    }

    /**
     * Constructs a PlantType with a name and parent subcategory. Auto-populates the subcategory and cycles fields with the parents.
     */
    public PlantType(String name, PlantSubCategory subCategory) {
        super(name, subCategory.getCycles(), subCategory.getGrowthStages());
        this.subCategory = subCategory;
    }

    /**
     * Constructs a PlantType with full details including stages.
     */
    public PlantType(String name, Integer cycles, PlantSubCategory subCategory, List<PlantableGrowthStage> growthStages) {
        super(name, cycles, growthStages);
        this.subCategory = subCategory;
    }

    /** Adds a growth stage and sets its back-reference. */
    @Override
    public void addStage(PlantableGrowthStage stage) {
        stage.setPlantable(this);
        growthStages.add(stage);
    }

    /** Removes a growth stage and clears its back-reference. */
    @Override
    public void removeStage(PlantableGrowthStage stage) {
        stage.setPlantable(null);
        growthStages.remove(stage);
    }

    /** Returns an unmodifiable list of growth stages. */
    public List<PlantableGrowthStage> getGrowthStages() {
        return List.copyOf(growthStages);
    }

    /** Gets the parent subcategory. */
    public PlantSubCategory getSubCategory() {
        return subCategory;
    }

    /** Updates the parent subcategory reference. */
    public void setSubCategory(PlantSubCategory subCategory) {
        this.subCategory = subCategory;
    }

    /** Updates the plant type name. */
    @Override
    public void setName(String name) {
        super.setName(name);
    }
}
