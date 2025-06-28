// PlantCategory.java
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
 * Owns its own list of growth stages and subcategories.
 */
@Entity
@Table(name = "plant_category")
@AttributeOverrides({
    @AttributeOverride(name = "id",   column = @Column(name = "category_id",   updatable = false, nullable = false)),
    @AttributeOverride(name = "name", column = @Column(name = "category_name", nullable = false, unique = true))
})
public class PlantCategory extends Plantable {

    /** Growth stages specific to this category. */
    @OneToMany(mappedBy = "plantable", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<PlantableGrowthStage> growthStages = new ArrayList<>();

    /** Subcategories under this plant category. */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlantSubCategory> subcategories = new ArrayList<>();

    protected PlantCategory() {
        super();
    }

    public PlantCategory(String name, Integer cycles, List<PlantableGrowthStage> growthStages) {
        super(name, cycles);
        this.growthStages.addAll(growthStages);
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

    public int getTotalDays() {
        return growthStages.stream()
            .mapToInt(PlantableGrowthStage::getDurationDays)
            .sum();
    }

    public List<PlantableGrowthStage> getGrowthStages() {
        return List.copyOf(growthStages);
    }

    public List<PlantSubCategory> getSubcategories() {
        return List.copyOf(subcategories);
    }

    @Override
    public void setName(String name) {
        super.setName(name);
    }
}
