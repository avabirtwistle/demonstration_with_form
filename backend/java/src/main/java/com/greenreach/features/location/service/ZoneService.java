package com.greenreach.features.location.service;
import com.greenreach.features.location.model.Room;
import com.greenreach.features.location.model.Zone;
import com.greenreach.features.location.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class ZoneService {

    private final ZoneRepository zoneRepository;

    @Autowired
    public ZoneService(ZoneRepository zoneRepository) {
        this.zoneRepository = zoneRepository;
    }

 
    /**
     * Looks up a Zone by the zoneCode and returns the zone if it exists otherwise it creates a new zone and saves it to the repository.
     * code in indexed for look ups in the zones table.
     *
     * @param code the zone code derived from the QR code\
     * @param roomCode the code for the room the zone belongs to
     * @return the zone with the corresponding code
     */
    @Transactional
    public Zone getOrCreateZone(String code, Room room) {
        Optional<Zone> optionalZone = zoneRepository.findByRoom_IdAndCode(room.getId(), code);
        if (optionalZone.isPresent()) {
            return optionalZone.get();
        } else {
            Zone newZone = Zone.builder(room).setCode(code).build();
            return zoneRepository.save(newZone);
        }
    }
}