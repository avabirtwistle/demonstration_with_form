package com.greenreach.features.location.repository;

import com.greenreach.features.location.model.Level;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LevelRepository extends JpaRepository<Level, Long> {

    /**
     * Finds a Level by its code. Level code is index in the table for faster lookups.
     * 
     * @param levelCode the code of the level which is unique to this specific rack
     * @return an Optional containing the Level if found, otherwise empty
     */
    Optional<Level> findByCode(String levelCode);

    /**
     * Finds a Level by its code and the ID of the Rack it belongs to.
     * 
     * @param rackId the ID of the parent rack
     * @param levelCode the code of the level which is unique to this specific rack
     * @return an Optional containing the Level if found, otherwise empty
     */
    Optional<Level> findByRack_IdAndCode(Long rackId, String levelCode);
}

