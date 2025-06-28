package com.greenreach.features.location.controller;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/slots")
public class SlotController {

    private final LocationService locationService;

    @Autowired
    public SlotController(LocationService locationService) {
        this.locationService = locationService;
    }

    /**
     * GET  /slots/free
     *
     * Find one free slot (location) to place a tray.
     *  - 200 OK + Slot body if found
     *  - 404 Not Found if no free slots exist
     */
    @GetMapping("/free")
    public ResponseEntity<Slot> getFreeSlot() {
        return locationService.getFreeSpot()
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    
}
