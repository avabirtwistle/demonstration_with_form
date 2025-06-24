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
@Table(name = "subcategory_growth_stage")
public class SubcategoryGrowthStage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcategory_stage_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "stage", nullable = false)
    private GrowthStageType stageName;

    @Column(name = "duration", nullable = false)
    private int durationDays;

    @Column(name = "order_index")
    private int orderIndex;

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", nullable = false)
    private PlantSubCategory subcategory;

    // Constructors
    public SubcategoryGrowthStage() {}

    // Optionally add constructor for easier instantiation
    public SubcategoryGrowthStage(GrowthStageType stageName, int durationDays, int orderIndex, PlantSubCategory subcategory) {
        this.stageName = stageName;
        this.durationDays = durationDays;
        this.orderIndex = orderIndex;
        this.subcategory = subcategory;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public GrowthStageType getStageName() { return stageName; }

    public void setStageName(GrowthStageType stageName) { this.stageName = stageName; }

    public int getDurationDays() { return durationDays; }

    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }

    public int getOrderIndex() { return orderIndex; }

    public void setOrderIndex(int orderIndex) { this.orderIndex = orderIndex; }

    public PlantSubCategory getSubcategory() { return subcategory; }

    public void setSubcategory(PlantSubCategory subcategory) { this.subcategory = subcategory; }
}