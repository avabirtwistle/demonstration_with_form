package com.greenreach.features.mqtt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/relay")
public class RelayControlController {

    @Autowired
    private MqttService mqttService;

    @PostMapping("/{relayId}")
    public ResponseEntity<String> controlRelay(
        @PathVariable int relayId,
        @RequestParam String state  // expects "on" or "off"
    ) {
        try {
            String topic = "greenreach/rack01/commands/relay/" + relayId;
            mqttService.publishCommand("rack01", "relay/" + relayId, state);
            return ResponseEntity.ok("Sent: " + state + " to relay " + relayId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to publish: " + e.getMessage());
        }
    }
}
