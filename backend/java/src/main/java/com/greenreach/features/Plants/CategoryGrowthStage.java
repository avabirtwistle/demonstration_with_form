
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
//tells hibernate the class is not an entity on its own but the fields in it should be inherited and mapped into the database columns of subclasses
//not stored as a seperate table but acs like a template

@Entity
@Table(name = "category_growth_stage")
public class CategoryGrowthStage {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_stage_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "stage")
    private GrowthStageType stageName;

    @Column(name = "duration")
    private int durationDays;

    @Column(name = "order_index")
    private int orderIndex;


    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", nullable = false)
    private PlantCategory category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public PlantCategory getCategory() {
        return category;
    }

    public void setCategory(PlantCategory category) {
        this.category = category;
    }
}

