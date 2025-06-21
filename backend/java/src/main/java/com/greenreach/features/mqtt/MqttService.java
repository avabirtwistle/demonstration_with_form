package com.greenreach.features.mqtt;

import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/**
 * MqttService handles MQTT communication for the GreenReach system.
 * <p>
 * It subscribes to status updates from all devices and provides a method to 
 * publish commands to specific rack controllers using MQTT topics.
 * </p>
 *
 * Topics follow the format:
 * - Subscription: greenreach/+/status  (status updates from any device)
 * - Publishing: greenreach/{rackId}/commands/{command} (commands to a rack)
 *
 * This service uses Eclipse Paho for MQTT messaging and is marked as a Spring
 * @Service for dependency injection.
 *
 * @author Ava Birtwistle
 * @version 1.0
 * @since 2025-06-20
 */
@Service
public class MqttService {

    private final MqttClient client;

    @Autowired
    public MqttService(MqttClient client) {
        this.client = client;

        try {
            client.subscribe("greenreach/+/status", (topic, msg) -> {
                String payload = new String(msg.getPayload());
                System.out.println("[MQTT RECEIVED] Topic: " + topic + " | Payload: " + payload);
                // TODO: Process data, save to DB, etc.
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void publishCommand(String rackId, String command, String payload) throws MqttException {
        String topic = String.format("greenreach/%s/commands/%s", rackId, command);
        MqttMessage message = new MqttMessage(payload.getBytes());
        message.setQos(1);
        client.publish(topic, message);
    }
}
