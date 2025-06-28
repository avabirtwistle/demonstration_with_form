package com.greenreach.features.switchbot;

import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/webhook")
public class SwitchBotWebHookController {

    private static final Logger log = LoggerFactory.getLogger(SwitchBotWebhookController.class);

    @PostMapping
    public ResponseEntity<String> handleWebhook(@RequestBody String payload) {
        log.info("Received webhook payload: {}", payload);
        // your logic here
        return ResponseEntity.ok("Webhook received");
    }
}
