package com.greenreach.features.location.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.greenreach.features.location.model.Rack;
import com.greenreach.features.location.model.Room;
import com.greenreach.features.location.model.Zone;
import com.greenreach.features.location.model.Level;
import com.greenreach.features.location.model.Slot;

@Service
@Transactional
public class SlotRegisterService {

    private final RoomService roomService;
    private final ZoneService zoneService;
    private final RackService rackService;
    private final LevelService levelService;
    private final SlotService slotService;

    public SlotRegisterService(
        RoomService roomService,
        ZoneService zoneService,
        RackService rackService,
        LevelService levelService,
        SlotService slotService
    ) {
        this.roomService = roomService;
        this.zoneService = zoneService;
        this.rackService = rackService;
        this.levelService = levelService;
        this.slotService = slotService;
    }

    public Slot getOrCreateSlot(String roomCode, String zoneCode, String rackCode, String levelCode, Integer slotIndex, String qr) {
        Room room = roomService.getOrCreateRoom(roomCode); 
        Zone zone = zoneService.getOrCreateZone(zoneCode, room);
        Rack rack = rackService.getOrCreateRack(rackCode, zone);
        Level level = levelService.getOrCreateLevel(levelCode, rack);
        return slotService.getOrCreateSlot(qr, slotIndex, level);
    }
}
