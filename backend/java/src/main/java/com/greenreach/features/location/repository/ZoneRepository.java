package com.greenreach.features.location.repository;
import com.greenreach.features.location.model.Zone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZoneRepository extends JpaRepository<Zone, Long> {
    Optional<Zone> findByCode(String code);
}
