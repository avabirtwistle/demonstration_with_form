package com.greenreach.features.irrigation.hardware.service;

import com.greenreach.features.mqtt.MqttService;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SolenoidService {

    private final MqttService mqttService;

    @Autowired
    public SolenoidService(MqttService mqttService) {
        this.mqttService = mqttService;
    }

    public void controlSolenoid(String rackId, int channel, String state) throws MqttException {
        String commandTopic = "solenoid/" + channel;
        mqttService.publishCommand(rackId, commandTopic, state);
    }
}
