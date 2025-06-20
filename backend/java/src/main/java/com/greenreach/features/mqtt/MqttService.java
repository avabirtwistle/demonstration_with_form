package com.greenreach.features.mqtt;

import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
