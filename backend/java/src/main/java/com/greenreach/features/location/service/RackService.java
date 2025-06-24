package com.greenreach.features.location.service;
import com.greenreach.features.location.model.Rack;
import com.greenreach.features.location.repository.RackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RackService {

    private final RackRepository rackRepository;

    @Autowired
    public RackService(RackRepository rackRepository) {
        this.rackRepository = rackRepository;
    }

    public Rack createRack(Rack rack) {
        return rackRepository.save(rack);
    }

    public Rack getRackOrThrow(String code) {
        return rackRepository.findByCode(code)
            .orElseThrow(() -> new RackNotFoundException(code));
    }

    public Optional<Rack> getRackByCode(String code) {
        return rackRepository.findByCode(code);
    }

    public List<Rack> getAllRacks() {
        return rackRepository.findAll();
    }
}
