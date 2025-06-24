package com.greenreach.features.location.service;
import com.greenreach.features.location.model.Zone;
import com.greenreach.features.location.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ZoneService {

    private final ZoneRepository zoneRepository;

    @Autowired
    public ZoneService(ZoneRepository zoneRepository) {
        this.zoneRepository = zoneRepository;
    }

    public Zone createZone(Zone zone) {
        return zoneRepository.save(zone);
    }

    public Optional<Zone> getZoneByCode(String code) {
        return zoneRepository.findByCode(code);
    }

    public List<Zone> getAllZones() {
        return zoneRepository.findAll();
    }
}
