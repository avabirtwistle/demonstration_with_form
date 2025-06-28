package com.greenreach.features.location.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenreach.features.location.service.SlotRegisterService;
import com.greenreach.features.location.components.*;
import com.greenreach.features.location.model.Slot;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;

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
  public ResponseEntity<SlotResponse> processQr(@RequestParam String code) {
    var parsed = qrCodeProcessor.parse(code);
    Slot slot = slotRegisterService.getOrCreateSlot(
      parsed.roomCode(),
      parsed.zoneCode(),
      parsed.rackCode(),
      parsed.levelCode(),
      parsed.slotIndex(),
      parsed.qrSuffix()
    );

    // Walk the object graph to pull out each code
    String roomCode  = slot.getLevel().getRack().getZone().getRoom().getCode();
    String zoneCode  = slot.getLevel().getRack().getZone().getCode();
    String rackCode  = slot.getLevel().getRack().getCode();
    String levelCode = slot.getLevel().getCode();

    var response = new SlotResponse(
      slot.getId(),
      slot.getCode(),
      slot.getSlotIndex(),
      roomCode,
      zoneCode,
      rackCode,
      levelCode
    );

    return ResponseEntity.ok(response);
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
