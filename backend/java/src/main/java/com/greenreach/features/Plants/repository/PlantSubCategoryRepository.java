package com.greenreach.features.plants.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greenreach.features.plants.model.PlantSubCategory;

@Repository
public interface PlantSubCategoryRepository extends JpaRepository<PlantSubCategory, Long> {
    
    Optional<PlantSubCategory> findByName(String name);
}

