package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * LocationService coordinates logic across location layers like Slot and Level.
 */
@Service
public class LocationService {


    private final SlotRepository slotRepository;

    @Autowired
    public LocationService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    /**
     * Returns an available slot if one exists (limited to 1 result).
     *
     * @return Optional containing a free Slot, or empty if none are available
     */
    public Optional<Slot> getFreeSpot() {
        Pageable limitOne = PageRequest.of(0, 1);
        List<Slot> freeSlots = slotRepository.findAllFreeSlots(limitOne);
        return freeSlots.isEmpty() ? Optional.empty() : Optional.of(freeSlots.get(0));
    }

}
