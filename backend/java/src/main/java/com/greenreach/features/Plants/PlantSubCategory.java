package com.greenreach.features.Plants;

import java.util.List;

import javax.persistence.CascadeType;
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
@Table(name = "plant_subcategory")
public class PlantSubCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcategory_id")
    private Long id;

    /**
     * The name of the plant type 
     */
    @Column(unique = true, nullable = false)
    private String name;

    /**
     * A list of the different growth stages.=-
     */
    @OneToMany(mappedBy = "subcategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubcategoryGrowthStage> growthStages;

    /**
     * The parent category this subcategory belongs to.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private PlantCategory category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SubcategoryGrowthStage> getGrowthStages() {
        return growthStages;
    }

    public void setGrowthStages(List<SubcategoryGrowthStage> growthStages) {
        this.growthStages = growthStages;
    }

    public PlantCategory getCategory() {
        return category;
    }

    public void setCategory(PlantCategory category) {
        this.category = category;
}

}
