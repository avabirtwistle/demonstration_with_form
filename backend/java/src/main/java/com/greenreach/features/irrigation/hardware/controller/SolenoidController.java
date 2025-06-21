package com.greenreach.features.irrigation.hardware.controller;
//this allows saving and querying the solenoid activities
//receives the HTTP request from the front end
//calls SolenoidService
import com.greenreach.features.irrigation.hardware.service.SolenoidService;
import com.greenreach.features.irrigation.hardware.dto.SolenoidCommand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/solenoids")
public class SolenoidController {

    private final SolenoidService solenoidService;

    @Autowired
    public SolenoidController(SolenoidService solenoidService) {
        this.solenoidService = solenoidService;
    }

    @PostMapping("/control")
    public ResponseEntity<String> control(@RequestBody SolenoidCommand cmd) {
        try {
            solenoidService.controlSolenoid(cmd.rackId, cmd.channel, cmd.state);
            return ResponseEntity.ok("Command sent to solenoid " + cmd.channel);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed: " + e.getMessage());
        }
    }
}

