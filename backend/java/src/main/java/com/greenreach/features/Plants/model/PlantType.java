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
     * Constructs a PlantType with a name and parent subcategory.
     * Copies cycles and growth stages from the subcategory.
     */
    public PlantType(String name, PlantSubCategory subCategory) {
        super(name, subCategory.getCycles());
        this.subCategory = subCategory;
        this.growthStages.addAll(subCategory.getGrowthStages());
        for (PlantableGrowthStage stage : this.growthStages) {
            stage.setPlantable(this);
        }
    }

    /**
     * Constructs a PlantType with full details including custom stages.
     */
    public PlantType(String name, Integer cycles, PlantSubCategory subCategory, List<PlantableGrowthStage> growthStages) {
        super(name, cycles);
        this.subCategory = subCategory;
        this.growthStages.addAll(growthStages);
        for (PlantableGrowthStage stage : this.growthStages) {
            stage.setPlantable(this);
        }
    }

    /** Adds a growth stage and sets its back-reference. */
    public void addStage(PlantableGrowthStage stage) {
        stage.setPlantable(this);
        growthStages.add(stage);
    }

    /** Removes a growth stage and clears its back-reference. */
    public void removeStage(PlantableGrowthStage stage) {
        growthStages.remove(stage);
        stage.setPlantable(null);
    }

    /** Returns an unmodifiable list of growth stages. */
    public List<PlantableGrowthStage> getGrowthStages() {
        return List.copyOf(growthStages);
    }

    /** Returns total duration of all growth stages. */
    public int getTotalDays() {
        return growthStages.stream()
            .mapToInt(PlantableGrowthStage::getDurationDays)
            .sum();
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
