package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Level;
import com.greenreach.features.location.model.Slot;
import com.greenreach.features.location.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class SlotService {

    private final SlotRepository slotRepository;

    @Autowired
    public SlotService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    @Transactional
    public Slot createSlot(String code, Level level) {
        Slot newSlot = Slot.builder(level).setCode(code).build();
        return slotRepository.save(newSlot);
    }

    public Optional<Slot> getSlotByCode(String code) {
        return slotRepository.findByCode(code);
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

    /**
     * Looks up a Slot by the slotCode and returns the slot if it exists otherwise it creates a new slot and saves it to the repository.
     * code in indexed for look ups in the slot table.
     *
     * @param code the slot code derived from the QR code
     * @param levelCode the code for the level 
     * @param slotIndex the slot index 
     * 
     * @return the slot with the corresponding code
     */
    @Transactional
    public Slot getOrCreateSlot(String code, Integer slotIndex, Level level) {
        Optional<Slot> optionalSlot = slotRepository.findByLevel_IdAndCode(level.getId(), code);
        if (optionalSlot.isPresent()) {
            return optionalSlot.get();
        } else {
            Slot newSlot = Slot.builder(level).setCode(code).setSlotIndex(slotIndex).build();
            newSlot.getLevel().incrementSlots();
            return slotRepository.save(newSlot);
        }
    }
}
