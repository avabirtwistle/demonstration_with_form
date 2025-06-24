package com.greenreach.features.location.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenreach.features.location.service.LocationService;
import com.greenreach.features.location.components.*;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;
import com.greenreach.features.location.service.SlotService;

@RestController
@RequestMapping(path = "/location")
public class QRController {

    private final QrCodeProcessor qrCodeProcessor;
    private final SlotRepository slotRepository;

    public QRController(QrCodeProcessor qrCodeProcessor, SlotRepository slotRepository) {
        this.qrCodeProcessor = qrCodeProcessor;
        this.slotRepository = slotRepository;
    }

    @GetMapping("/scan")
    public ResponseEntity<?> processQr(@RequestParam String code) {
        QrCodeProcessor.ParsedQr parsed = qrCodeProcessor.parse(code);

        // Now you can use:
        // parsed.roomCode(), parsed.zoneCode(), etc.

        // Example: use it to find the Slot
        Optional<Slot> slot = slotRepository.findByQr(parsed.qrSuffix);

        return ResponseEntity.ok("Slot found: " + slot.getId());
    }
}

