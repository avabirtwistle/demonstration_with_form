package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Rack;
import com.greenreach.features.location.model.Zone;
import com.greenreach.features.location.repository.RackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class RackService {

    private final RackRepository rackRepository;

    @Autowired
    public RackService(RackRepository rackRepository) {
        this.rackRepository = rackRepository;
    }


    /**
     * Looks up a Rack by the rackCode and returns the Rack if it exists otherwise it creates a new Rack.
     * code in indexed for look ups in the racks table.
     *
     * @param code the Rack code derived from the QR code
     * @param zone the Zone the rack is in
     * @return the rack with the corresponding code
     */
    @Transactional
    public Rack getOrCreateRack(String code, Zone zone) {
        Optional<Rack> optionalRack = rackRepository.findByZoneIdAndCode(zone.getId(), code);
        if (optionalRack.isPresent()) {
            return optionalRack.get();
        } else {
            Rack newRack = Rack.builder(zone).setCode(code).build();
            return rackRepository.save(newRack);
        }
    }

}
