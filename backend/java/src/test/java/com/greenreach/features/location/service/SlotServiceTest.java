package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;
import com.greenreach.features.location.service.SlotService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class SlotServiceTest {

    private SlotRepository slotRepository;
    private SlotService slotService;

    @BeforeEach
    void setUp() {
        slotRepository = mock(SlotRepository.class);
        slotService = new SlotService(slotRepository);
    }

    @Test
    void testCreateSlot() {
        Slot slot = Slot.builder().setQR("QR123").setOccupancy(0).build();
        when(slotRepository.save(slot)).thenReturn(slot);

        Slot saved = slotService.createSlot(slot);

        assertNotNull(saved);
        assertEquals("QR123", saved.getQR());
        verify(slotRepository).save(slot);
    }

    @Test
    void testGetSlotByQr_Found() {
        Slot slot = Slot.builder().setQR("QR123").setOccupancy(0).build();
        when(slotRepository.findByQr("QR123")).thenReturn(Optional.of(slot));

        Optional<Slot> result = slotService.getSlotByQr("QR123");

        assertTrue(result.isPresent());
        assertEquals("QR123", result.get().getQR());
        verify(slotRepository).findByQr("QR123");
    }

    @Test
    void testGetSlotByQr_NotFound() {
        when(slotRepository.findByQr("QR999")).thenReturn(Optional.empty());

        Optional<Slot> result = slotService.getSlotByQr("QR999");

        assertFalse(result.isPresent());
    }

    @Test
    void testGetAllSlots() {
        List<Slot> mockSlots = new ArrayList<>();
        mockSlots.add(Slot.builder().setQR("A").setOccupancy(1).build());
        mockSlots.add(Slot.builder().setQR("B").setOccupancy(0).build());

        when(slotRepository.findAll()).thenReturn(mockSlots);

        List<Slot> result = slotService.getAllSlots();

        assertEquals(2, result.size());
        verify(slotRepository).findAll();
    }

    @Test
    void testDeleteSlot() {
        Long id = 1L;
        slotService.deleteSlot(id);
        verify(slotRepository).deleteById(id);
    }

    @Test
    void testGetSlotById() {
        Slot slot = Slot.builder().setQR("ID123").setOccupancy(1).build();
        when(slotRepository.findById(1L)).thenReturn(Optional.of(slot));

        Optional<Slot> result = slotService.getSlotById(1L);

        assertTrue(result.isPresent());
        assertEquals("ID123", result.get().getQR());
        verify(slotRepository).findById(1L);
    }
}
