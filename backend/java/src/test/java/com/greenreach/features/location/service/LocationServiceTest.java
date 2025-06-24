package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;
import com.greenreach.features.location.repository.RoomRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class LocationServiceTest {

    private LocationService locationService;
    private SlotRepository slotRepository;

    @BeforeEach
    void setUp() {
        slotRepository = mock(SlotRepository.class);
        locationService = new LocationService(slotRepository);
    }

    @Test
    void testGetFreeSlot_WhenAvailable() {
        Slot freeSlot = Slot.builder().setQR("SLOT-01").setOccupancy(0).build();
        List<Slot> mockSlots = List.of(freeSlot);
        when(slotRepository.findAll()).thenReturn(mockSlots);

        Optional<Slot> result = locationService.getFreeSpot();

        assertTrue(result.isPresent());
        assertEquals("SLOT-01", result.get().getQR());
    }

    // Add more tests based on your methods
}
