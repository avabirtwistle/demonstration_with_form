package com.greenreach.features.location.controller;

import com.greenreach.features.location.components.LocationQrCodeProcessor;
import com.greenreach.features.location.components.LocationQrCodeProcessor.ParsedQr;
import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.service.SlotRegisterService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class QRControllerTest {

    private MockMvc mockMvc;

    @Mock
    private LocationQrCodeProcessor qrCodeProcessor;

    @Mock
    private SlotRegisterService slotRegisterService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        QRController controller = new QRController(qrCodeProcessor, slotRegisterService);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    @DisplayName("Valid QR returns slot ID")
    void whenValidQr_thenReturnsSlotId() throws Exception {
        String rawCode = "LOC-01-02-03-01-10-XYZ999";
        ParsedQr parsed = new ParsedQr("01", "02", "03", "01", 1, "XYZ999");
        when(qrCodeProcessor.parse(rawCode)).thenReturn(parsed);

        Slot stubSlot = mock(Slot.class);
        when(stubSlot.getId()).thenReturn(123L);
        when(slotRegisterService.getOrCreateSlot(
                parsed.roomCode(),
                parsed.zoneCode(),
                parsed.rackCode(),
                parsed.levelCode(),
                parsed.slotIndex(),
                parsed.qrSuffix()
        )).thenReturn(stubSlot);

        mockMvc.perform(get("/scan/location")
                .param("code", rawCode)
                .accept(MediaType.TEXT_PLAIN)
            )
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string("Slot ID: 123"));

        verify(qrCodeProcessor).parse(rawCode);
        verify(slotRegisterService).getOrCreateSlot(
                parsed.roomCode(),
                parsed.zoneCode(),
                parsed.rackCode(),
                parsed.levelCode(),
                parsed.slotIndex(),
                parsed.qrSuffix()
        );
    }

    @Test
    @DisplayName("Missing code param returns 400 Bad Request")
    void whenMissingParam_thenBadRequest() throws Exception {
        mockMvc.perform(get("/scan/location"))
               .andDo(print())
               .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Invalid QR format returns 500 with message")
    void whenInvalidQr_thenInternalServerError() throws Exception {
        String badCode = "INVALID";
        when(qrCodeProcessor.parse(badCode))
                .thenThrow(new IllegalArgumentException("Invalid QR format"));

        mockMvc.perform(get("/scan/location")
                .param("code", badCode)
            )
            .andDo(print())
            .andExpect(status().isInternalServerError())
            .andExpect(content().string("Invalid QR format"));

        verify(qrCodeProcessor).parse(badCode);
        verifyNoInteractions(slotRegisterService);
    }

    @Test
    @DisplayName("Service error returns 500 with generic message")
    void whenServiceError_thenInternalServerError() throws Exception {
        String rawCode = "LOC-01-02-03-01-10-XYZ999";
        ParsedQr parsed = new ParsedQr("01", "02", "03", "01", 1, "XYZ999");
        when(qrCodeProcessor.parse(rawCode)).thenReturn(parsed);
        when(slotRegisterService.getOrCreateSlot(
                parsed.roomCode(),
                parsed.zoneCode(),
                parsed.rackCode(),
                parsed.levelCode(),
                parsed.slotIndex(),
                parsed.qrSuffix()
        )).thenThrow(new RuntimeException("database down"));

        mockMvc.perform(get("/scan/location")
                .param("code", rawCode)
            )
            .andDo(print())
            .andExpect(status().isInternalServerError())
            .andExpect(content().string("Internal error: database down"));

        verify(qrCodeProcessor).parse(rawCode);
        verify(slotRegisterService).getOrCreateSlot(
                parsed.roomCode(),
                parsed.zoneCode(),
                parsed.rackCode(),
                parsed.levelCode(),
                parsed.slotIndex(),
                parsed.qrSuffix()
        );
    }
}
