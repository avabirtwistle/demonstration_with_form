package com.greenreach.features.irrigation.hardware.dto;
//represents the solenoid commands for control requests
//receives command requests from the frontend as a JSON file
public class SolenoidCommand {
    public String rackId;
    public int channel;
    public String state;
}

