package com.greenreach.features.mqtt;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;


@Configuration
public class MqttConfig {

    @Autowired
    private MqttProperties mqttProperties;

    @Bean
    public MqttClient mqttClient() throws MqttException {
        MqttClient client = new MqttClient(
            mqttProperties.getBroker(), 
            mqttProperties.getClientId()
        );

        MqttConnectOptions options = new MqttConnectOptions();
        options.setCleanSession(true);
        options.setAutomaticReconnect(true);
        options.setConnectionTimeout(10);
        options.setKeepAliveInterval(30);

        if (mqttProperties.getUsername() != null) {
            options.setUserName(mqttProperties.getUsername());
            options.setPassword(mqttProperties.getPassword().toCharArray());
        }

        System.out.println("=== MQTT Config ===");
        System.out.println("Broker: " + mqttProperties.getBroker());
        System.out.println("Client ID: " + mqttProperties.getClientId());
        System.out.println("Username: " + mqttProperties.getUsername());
        System.out.println("===================");
        client.connect(options);
        return client;
    }
}
