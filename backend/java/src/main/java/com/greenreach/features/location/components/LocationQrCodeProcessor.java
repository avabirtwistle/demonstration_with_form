package com.greenreach.features.location.components;
import org.springframework.stereotype.Component;

@Component
public class LocationQrCodeProcessor {

    public ParsedQr parse(String code) {
        if (code == null || !code.startsWith("LOC-")) {
            throw new IllegalArgumentException("Invalid QR format");
        }
        String[] parts = code.split("-");
        if (parts.length < 7) {
            throw new IllegalArgumentException("QR code missing required segments");
        }

    return new ParsedQr(parts[1], parts[2], parts[3], parts[4], Integer.parseInt(parts[5]), parts[6]);
    }

    public record ParsedQr(String roomCode, String zoneCode, String rackCode, String levelCode, Integer slotIndex, String qrSuffix) {}
}

