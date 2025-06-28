package com.greenreach.features.location.service;

public class RackNotFoundException extends RuntimeException {
    public RackNotFoundException(String code) {
        super("Rack with code " + code + " not found.");
    }
}
