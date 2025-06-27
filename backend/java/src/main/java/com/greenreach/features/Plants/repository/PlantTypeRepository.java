package com.greenreach.features.plants.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenreach.features.plants.model.PlantType;

import java.util.Optional;

public interface PlantTypeRepository extends JpaRepository<PlantType, Long> {
    Optional<PlantType> findByName(String name);

    
}
