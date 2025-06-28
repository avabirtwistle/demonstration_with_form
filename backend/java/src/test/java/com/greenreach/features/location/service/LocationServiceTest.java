/* 
package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;
import com.greenreach.features.location.repository.RoomRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.any;
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
        Slot freeSlot = Slot.builder()
                            .setCode("SLOT-01")
                            .setOccupancy(0)
                            .build();

        // Stub the correct repository method
        when(slotRepository.findAllFreeSlots(any())).thenReturn(List.of(freeSlot));

        Optional<Slot> result = locationService.getFreeSpot();

        assertTrue(result.isPresent());
        assertEquals("SLOT-01", result.get().getCode());
    }


    // Add more tests based on your methods
}
*/