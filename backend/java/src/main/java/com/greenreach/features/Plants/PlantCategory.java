package com.greenreach.features.Plants;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class PlantCategory {

    /**
     * Primary key for the plant category. Automatically generated.
     */
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The name of the plant type(ex. greens, herbs).
     */
    @Column(unique = true, nullable = false)
    private String name;  


    /**
     * A list of the different stages.
     */
    @OneToMany(mappedBy = "category")
    List<CategoryGrowthStage> growthStages;

   /**
     * Required by JPA.
     */
    public PlantCategory() {}    

    /**
     * Custom constructor.
     */
    public PlantCategory(String name, List<CategoryGrowthStage> growthStages) {
        this.name = name;
        this.growthStages = growthStages;
        if (growthStages != null) {
            for (CategoryGrowthStage stage : growthStages) {
                stage.setCategory(this); 
            }
        }
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<CategoryGrowthStage> getGrowthStages() {
        return growthStages;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateGrowthStages(List<CategoryGrowthStage> growthStages) {
        this.growthStages = growthStages;
    }

    public void setName(String name) {
        this.name = name;
    }

}