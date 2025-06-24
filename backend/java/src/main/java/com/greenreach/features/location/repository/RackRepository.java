package com.greenreach.features.location.repository;
import com.greenreach.features.location.model.Rack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RackRepository extends JpaRepository<Rack, Long> {
    Optional<Rack> findByCode(String code);
}
