package com.greenreach.features.location.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenreach.features.location.service.SlotRegisterService;
import com.greenreach.features.location.components.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import com.greenreach.features.location.model.Slot;

@RestController
@RequestMapping(path = "/scan")
public class QRController {

    private final LocationQrCodeProcessor qrCodeProcessor;
    private final SlotRegisterService slotRegisterService;

    public QRController(LocationQrCodeProcessor qrCodeProcessor, SlotRegisterService slotRegisterService) {
        this.qrCodeProcessor = qrCodeProcessor;
        this.slotRegisterService = slotRegisterService;
    }

    @GetMapping("/location")
    public ResponseEntity<?> processQr(@RequestParam String code) {
        // Parse the code
        LocationQrCodeProcessor.ParsedQr parsed = qrCodeProcessor.parse(code);

        //Get or create the slot with the proper 
        Slot slot = slotRegisterService.getOrCreateSlot(
            parsed.roomCode(),
            parsed.zoneCode(),
            parsed.rackCode(),
            parsed.levelCode(),     
            parsed.slotIndex(),
            parsed.qrSuffix() //the unique qr code string
        );
        return ResponseEntity.ok("Slot ID: " + slot.getId());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadQr(IllegalArgumentException ex) {
        // ex.getMessage() is “Invalid QR format” or “QR code missing required segments”
        return ResponseEntity
                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
                 .body(ex.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleServiceError(RuntimeException ex) {
        return ResponseEntity
                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
                 .body("Internal error: " + ex.getMessage());
    }
}

