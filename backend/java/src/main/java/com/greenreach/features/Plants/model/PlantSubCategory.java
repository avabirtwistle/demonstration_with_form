// PlantSubCategory.java
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 * Represents a mid-level plant grouping (e.g., Lettuce) under a category.
 */
@Entity
@Table(name = "plant_subcategory")
@AttributeOverrides({
    @AttributeOverride(name = "id",   column = @Column(name = "subcategory_id",   updatable = false, nullable = false)),
    @AttributeOverride(name = "name", column = @Column(name = "subcategory_name", nullable = false, unique = true))
})
public class PlantSubCategory extends Plantable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private PlantCategory category;

    /** Growth stages specific to this subcategory. */
    @OneToMany(mappedBy = "plantable", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<PlantableGrowthStage> growthStages = new ArrayList<>();

    /** Varieties under this subcategory. */
    @OneToMany(mappedBy = "subCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlantType> types = new ArrayList<>();

    protected PlantSubCategory() {}

    public PlantSubCategory(String name, PlantCategory category) {
        super(name, category.getCycles());
        this.category = category;
        this.growthStages.addAll(category.getGrowthStages());
        for (PlantableGrowthStage stage : this.growthStages) {
            stage.setPlantable(this);
        }
    }

    public PlantSubCategory(String name, Integer cycles, PlantCategory category, List<PlantableGrowthStage> customStages) {
        super(name, cycles);
        this.category = category;
        this.growthStages.addAll(customStages);
        for (PlantableGrowthStage stage : this.growthStages) {
            stage.setPlantable(this);
        }
    }

    public void addStage(PlantableGrowthStage stage) {
        stage.setPlantable(this);
        growthStages.add(stage);
    }

    public void removeStage(PlantableGrowthStage stage) {
        growthStages.remove(stage);
        stage.setPlantable(null);
    }

    public List<PlantableGrowthStage> getGrowthStages() {
        return List.copyOf(growthStages);
    }

    public int getTotalDays() {
        return growthStages.stream()
            .mapToInt(PlantableGrowthStage::getDurationDays)
            .sum();
    }

    public List<PlantType> getTypes() {
        return List.copyOf(types);
    }

    public PlantCategory getCategory() {
        return category;
    }

    public void setCategory(PlantCategory category) {
        this.category = category;
    }

    @Override
    public void setName(String name) {
        super.setName(name);
    }
}
