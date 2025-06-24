package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SlotService {

    private final SlotRepository slotRepository;

    @Autowired
    public SlotService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public Slot createSlot(Slot slot) {
        return slotRepository.save(slot);
    }

    public Optional<Slot> getSlotByQr(String code) {
        return slotRepository.findByQr(code);
    }


    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }

    public void deleteSlot(Long id) {
        slotRepository.deleteById(id);
    }

    public Optional<Slot> getSlotById(Long id) {
        return slotRepository.findById(id);
    }
}
