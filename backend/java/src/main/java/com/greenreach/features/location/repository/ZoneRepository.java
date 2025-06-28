package com.greenreach.features.location.repository;
import com.greenreach.features.location.model.Zone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZoneRepository extends JpaRepository<Zone, Long> {
    Optional<Zone> findByCode(String roomCode);

    /**
     * Finds a Zone by its code and the ID of the Rack it belongs to.
     * 
     * @param rackId the ID of the parent rack
     * @param levelCode the code of the level which is unique to this specific rack
     * @return an Optional containing the Level if found, otherwise empty
     */
    Optional<Zone> findByRoomIdAndCode(Long roomId, String zoneCode);
}
