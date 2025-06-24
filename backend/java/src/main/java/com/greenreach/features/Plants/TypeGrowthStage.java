package com.greenreach.features.Plants;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "type_growth_stage")
public class TypeGrowthStage {
    
    /**
     * Primary Key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcategory_stage_id")
    private Long id;

    /**
     * Name of the stage (predefined)
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "stage", nullable = false)
    private GrowthStageType stageName;

    /**
     * The length of this specific stage. After time expires move to next stage
     */
    @Column(name = "duration", nullable = false)
    private int durationDays;

    /**
     * The corresponding order for the growth stage. 0 for germnation
     * 1 for seedling, 2 for vegetative, 3 for fruiting, 4 for harvest
     */
    @Column(name = "order_index")
    private int orderIndex;

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "type_id", nullable = false)
    private PlantType plantType;

    /**
     * Required by JPA
     */
    public TypeGrowthStage() {}

    public TypeGrowthStage(GrowthStageType stageName, int durationDays, int orderIndex, PlantType plantType) {
        this.stageName = stageName;
        this.durationDays = durationDays;
        this.orderIndex = orderIndex;
        this.plantType = plantType;
    }

    public Long getId() { 
        return id; 
    }

    public GrowthStageType getStageName() { 
        return stageName; 
    }

    public void setStageName(GrowthStageType stageName) { 
        this.stageName = stageName; 
    }

    public int getDurationDays() { 
        return durationDays; 
    }

    public void setDurationDays(int durationDays) { 
        this.durationDays = durationDays; 
    }

    public int getOrderIndex() { 
        return orderIndex; 
    }

    public void setOrderIndex(int orderIndex) { 
        this.orderIndex = orderIndex; 
    }

    public PlantType getPlantType() { 
        return plantType; 
    }

    public void setPlantType(PlantType plantType) { 
        this.plantType = plantType; 
    }
}