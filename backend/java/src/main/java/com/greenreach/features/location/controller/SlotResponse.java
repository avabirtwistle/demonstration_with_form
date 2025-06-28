package com.greenreach.features.location.controller;

/**
 * A simple DTO for returning slot metadata in the scan response.
 */
public record SlotResponse(
    Long   id,
    String qrSuffix,
    Integer slotIndex,
    String roomCode,
    String zoneCode,
    String rackCode,
    String levelCode
) {}
