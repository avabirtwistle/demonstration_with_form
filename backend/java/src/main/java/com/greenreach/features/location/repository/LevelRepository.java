package com.greenreach.features.location.repository;

import com.greenreach.features.location.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LevelRepository extends JpaRepository<Level, Long> {
    Optional<Level> findByCode(String code);
}
