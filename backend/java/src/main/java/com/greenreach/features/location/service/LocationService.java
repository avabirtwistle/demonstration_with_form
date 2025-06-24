package com.greenreach.features.location.service;
//Handles the coordination accross all layers

import com.greenreach.features.location.model.*;
import com.greenreach.features.location.repository.SlotRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final SlotRepository slotRepository;

    @Autowired
    public LocationService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public Optional<Slot> getFreeSpot() {
        Pageable limitOne = PageRequest.of(0, 1);
        List<Slot> freeSlots = slotRepository.findAllFreeSlots(limitOne);
        return freeSlots.isEmpty() ? Optional.empty() : Optional.of(freeSlots.get(0));
    }
}