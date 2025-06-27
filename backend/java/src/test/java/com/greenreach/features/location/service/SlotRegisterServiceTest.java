package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Level;
import com.greenreach.features.location.model.Rack;
import com.greenreach.features.location.model.Room;
import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.model.Zone;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InOrder;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SlotRegisterServiceTest {

    private RoomService roomService;
    private ZoneService zoneService;
    private RackService rackService;
    private LevelService levelService;
    private SlotService slotService;
    private SlotRegisterService slotRegisterService;

    //Delimmited QR code
    private static final String ROOM_CODE  = "01";
    private static final String ZONE_CODE  = "02";
    private static final String RACK_CODE  = "03";
    private static final String LEVEL_CODE = "L1";
    private static final Integer SLOT_INDEX = 1;
    private static final String QR_CODE    = "XYZ999";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        roomService  = mock(RoomService.class);
        zoneService  = mock(ZoneService.class);
        rackService  = mock(RackService.class);
        levelService = mock(LevelService.class);
        slotService  = mock(SlotService.class);

        slotRegisterService = new SlotRegisterService(
            roomService,
            zoneService,
            rackService,
            levelService,
            slotService
        );
    }

    private Room makeRoom() {
        return Room.builder().setCode(ROOM_CODE).build();   //Make the room everything is contained in
    }

    private Zone makeZone(Room room) {
        return Zone.builder(room).setCode(ZONE_CODE).build(); //Make the zone within this Room
    }

    private Rack makeRack(Zone zone) {
        return Rack.builder(zone).setCode(RACK_CODE).build(); //Make the rack within the Zone
    }

    private Level makeLevel(Rack rack) {
        return Level.builder(rack).setCode(LEVEL_CODE).build(); //Make a level on the Rack
    }

    private Slot makeSlot(Level level) {
        return Slot.builder(level).setCode(QR_CODE).setSlotIndex(SLOT_INDEX).build(); //Make a Slot on the Level
    }

    @Test
    @DisplayName("Successful chain: returns the slot from SlotService")
    void testGetOrCreateSlotSuccess() {
        Room room   = makeRoom();
        Zone zone   = makeZone(room);
        Rack rack   = makeRack(zone);
        Level level = makeLevel(rack);
        Slot slot   = makeSlot(level);

        when(roomService.getOrCreateRoom(ROOM_CODE)).thenReturn(room);
        when(zoneService.getOrCreateZone(ZONE_CODE, room)).thenReturn(zone);
        when(rackService.getOrCreateRack(RACK_CODE, zone)).thenReturn(rack);
        when(levelService.getOrCreateLevel(LEVEL_CODE, rack)).thenReturn(level);
        when(slotService.getOrCreateSlot(QR_CODE, SLOT_INDEX, level)).thenReturn(slot);

        Slot result = slotRegisterService.getOrCreateSlot(
            ROOM_CODE, ZONE_CODE, RACK_CODE, LEVEL_CODE, SLOT_INDEX, QR_CODE
        );

        assertSame(slot, result);

        InOrder inOrder = inOrder(
            roomService,
            zoneService,
            rackService,
            levelService,
            slotService
        );
        inOrder.verify(roomService).getOrCreateRoom(ROOM_CODE);
        inOrder.verify(zoneService).getOrCreateZone(ZONE_CODE, room);
        inOrder.verify(rackService).getOrCreateRack(RACK_CODE, zone);
        inOrder.verify(levelService).getOrCreateLevel(LEVEL_CODE, rack);
        inOrder.verify(slotService).getOrCreateSlot(QR_CODE, SLOT_INDEX, level);
        inOrder.verifyNoMoreInteractions();
    }

    @Nested
    @DisplayName("Error propagation")
    class ErrorPropagation {

        @Test
        @DisplayName("RoomService exception bubbles up and stops execution")
        void testRoomServiceThrows() {
            when(roomService.getOrCreateRoom(ROOM_CODE))
                .thenThrow(new IllegalStateException("room failure"));

            IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                () -> slotRegisterService.getOrCreateSlot(
                    ROOM_CODE, ZONE_CODE, RACK_CODE, LEVEL_CODE, SLOT_INDEX, QR_CODE
                )
            );
            assertEquals("room failure", ex.getMessage());
            verify(roomService).getOrCreateRoom(ROOM_CODE);
            verifyNoMoreInteractions(zoneService, rackService, levelService, slotService);
        }

        @Test
        @DisplayName("ZoneService exception bubbles up after RoomService")
        void testZoneServiceThrows() {
            Room room = makeRoom();
            when(roomService.getOrCreateRoom(ROOM_CODE)).thenReturn(room);
            when(zoneService.getOrCreateZone(ZONE_CODE, room))
                .thenThrow(new RuntimeException("zone failure"));

            RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> slotRegisterService.getOrCreateSlot(
                    ROOM_CODE, ZONE_CODE, RACK_CODE, LEVEL_CODE, SLOT_INDEX, QR_CODE
                )
            );
            assertEquals("zone failure", ex.getMessage());
            verify(roomService).getOrCreateRoom(ROOM_CODE);
            verify(zoneService).getOrCreateZone(ZONE_CODE, room);
            verifyNoMoreInteractions(rackService, levelService, slotService);
        }

        @Test
        @DisplayName("RackService exception bubbles up after ZoneService")
        void testRackServiceThrows() {
            Room room = makeRoom();
            Zone zone = makeZone(room);

            when(roomService.getOrCreateRoom(ROOM_CODE)).thenReturn(room);
            when(zoneService.getOrCreateZone(ZONE_CODE, room)).thenReturn(zone);
            when(rackService.getOrCreateRack(RACK_CODE, zone))
                .thenThrow(new IllegalArgumentException("rack failure"));

            IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> slotRegisterService.getOrCreateSlot(
                    ROOM_CODE, ZONE_CODE, RACK_CODE, LEVEL_CODE, SLOT_INDEX, QR_CODE
                )
            );
            assertEquals("rack failure", ex.getMessage());
            verify(roomService).getOrCreateRoom(ROOM_CODE);
            verify(zoneService).getOrCreateZone(ZONE_CODE, room);
            verify(rackService).getOrCreateRack(RACK_CODE, zone);
            verifyNoMoreInteractions(levelService, slotService);
        }

        @Test
        @DisplayName("LevelService exception bubbles up after RackService")
        void testLevelServiceThrows() {
            Room room = makeRoom();
            Zone zone = makeZone(room);
            Rack rack = makeRack(zone);

            when(roomService.getOrCreateRoom(ROOM_CODE)).thenReturn(room);
            when(zoneService.getOrCreateZone(ZONE_CODE, room)).thenReturn(zone);
            when(rackService.getOrCreateRack(RACK_CODE, zone)).thenReturn(rack);
            when(levelService.getOrCreateLevel(LEVEL_CODE, rack))
                .thenThrow(new UnsupportedOperationException("level failure"));

            UnsupportedOperationException ex = assertThrows(
                UnsupportedOperationException.class,
                () -> slotRegisterService.getOrCreateSlot(
                    ROOM_CODE, ZONE_CODE, RACK_CODE, LEVEL_CODE, SLOT_INDEX, QR_CODE
                )
            );
            assertEquals("level failure", ex.getMessage());
            verify(roomService).getOrCreateRoom(ROOM_CODE);
            verify(zoneService).getOrCreateZone(ZONE_CODE, room);
            verify(rackService).getOrCreateRack(RACK_CODE, zone);
            verify(levelService).getOrCreateLevel(LEVEL_CODE, rack);
            verifyNoMoreInteractions(slotService);
        }

        @Test
        @DisplayName("SlotService exception bubbles up after LevelService")
        void testSlotServiceThrows() {
            Room room   = makeRoom();
            Zone zone   = makeZone(room);
            Rack rack   = makeRack(zone);
            Level level = makeLevel(rack);

            when(roomService.getOrCreateRoom(ROOM_CODE)).thenReturn(room);
            when(zoneService.getOrCreateZone(ZONE_CODE, room)).thenReturn(zone);
            when(rackService.getOrCreateRack(RACK_CODE, zone)).thenReturn(rack);
            when(levelService.getOrCreateLevel(LEVEL_CODE, rack)).thenReturn(level);
            when(slotService.getOrCreateSlot(QR_CODE, SLOT_INDEX, level))
                .thenThrow(new IllegalStateException("slot failure"));

            IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                () -> slotRegisterService.getOrCreateSlot(
                    ROOM_CODE, ZONE_CODE, RACK_CODE, LEVEL_CODE, SLOT_INDEX, QR_CODE
                )
            );
            assertEquals("slot failure", ex.getMessage());
            verify(roomService).getOrCreateRoom(ROOM_CODE);
            verify(zoneService).getOrCreateZone(ZONE_CODE, room);
            verify(rackService).getOrCreateRack(RACK_CODE, zone);
            verify(levelService).getOrCreateLevel(LEVEL_CODE, rack);
            verify(slotService).getOrCreateSlot(QR_CODE, SLOT_INDEX, level);
        }
    }
}
