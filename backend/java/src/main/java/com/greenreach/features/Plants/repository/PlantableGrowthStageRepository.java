package com.greenreach.features.plants.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenreach.features.plants.model.PlantableGrowthStage;

@Repository
public interface PlantableGrowthStageRepository extends JpaRepository<PlantableGrowthStage, Long> {
}
