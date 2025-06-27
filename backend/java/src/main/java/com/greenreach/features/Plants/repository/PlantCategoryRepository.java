package com.greenreach.features.plants.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenreach.features.plants.model.PlantCategory;

import java.util.Optional;

public interface PlantCategoryRepository
        extends JpaRepository<PlantCategory, Long> {

    Optional<PlantCategory> findByName(String name);
}
