package com.greenreach.features.location.repository;
import com.greenreach.features.location.model.Rack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RackRepository extends JpaRepository<Rack, Long> {
    Optional<Rack> findByCode(String code);

    /**
     * Finds a Rack by its code and the ID of the Zone it belongs to.
     * 
     * @param zoneId the ID of the parent Zone
     * @param code the code of the rack which is unique inside this specific room
     * @return an Optional containing the Rack if found, otherwise empty
     */
    Optional<Rack> findByZone_IdAndCode(Long zoneId, String rackCode);
}
