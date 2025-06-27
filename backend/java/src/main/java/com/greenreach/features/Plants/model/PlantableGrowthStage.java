package com.greenreach.features.plants.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.greenreach.features.plants.GrowthStageType;

@Entity
@Table(
    name = "growth_stage",
    indexes = {
      @Index(name = "idx_growth_stage_order", columnList = "order_index"),
      @Index(name = "idx_growth_stage_plantable_order", columnList = "plantable_id,order_index")
    }
)
public class PlantableGrowthStage {

    /** Number of times this plant can be harvested before replacement */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_stage_id")
    private Long id;

    /** Number of times this plant can be harvested before replacement */
    @Enumerated(EnumType.STRING)
    @Column(name = "stage")
    private GrowthStageType stageName;

    /** The duration in days the plant is in this growth stage for */
    @Column(name = "duration")
    private int durationDays;

    /** The index number the represents what stage the plant is in. Used for ordering the growth stages */
    @Column(name = "order_index")
    private int orderIndex;

    /** The Plantable (plant category, subcategory or type) that this growth stage belongs to */
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "plantable_id", nullable = false)
    private Plantable plantable;


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

    public Plantable getPlantable() {
        return plantable;
    }

    public void setPlantable(Plantable plantable) {
        this.plantable = plantable;
    }
}