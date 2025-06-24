package com.greenreach.features.location.service;

import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.BeforeEach;

import com.greenreach.features.location.model.Rack.RackBuilder;
import com.greenreach.features.location.repository.RackRepository;
import com.greenreach.features.location.repository.SlotRepository;

import com.greenreach.features.location.model.Rack;
import com.greenreach.features.location.repository.RackRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class RackServiceTest {

    private RackRepository rackRepository;
    private RackService rackService;

    @BeforeEach
    void setUp() {
        rackRepository = mock(RackRepository.class);
        rackService = new RackService(rackRepository);
    }

    @Test
    void testGetRackOrThrow_Found() {
        Rack rack = Rack.builder().setRackCode("RACK-001").build();
        when(rackRepository.findByCode("RACK-001")).thenReturn(Optional.of(rack));

        Rack result = rackService.getRackOrThrow("RACK-001");

        assertNotNull(result);
        assertEquals("RACK-001", result.getCode());
    }

    @Test
    void testGetRackOrThrow_NotFound() {
        when(rackRepository.findByCode("RACK-999")).thenReturn(Optional.empty());

        RackNotFoundException exception = assertThrows(
            RackNotFoundException.class,
            () -> rackService.getRackOrThrow("RACK-999")
        );

        assertEquals("Rack with code RACK-999 not found.", exception.getMessage());
    }
}

