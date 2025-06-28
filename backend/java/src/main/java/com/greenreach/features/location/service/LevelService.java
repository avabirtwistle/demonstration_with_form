package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Level;
import com.greenreach.features.location.model.Rack;
import com.greenreach.features.location.repository.LevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class LevelService {

    private final LevelRepository levelRepository;

    @Autowired
    public LevelService(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    public List<Level> getAllLevels() {
        return levelRepository.findAll();
    }

    /**
     * Looks up a Level by the levelCode and returns the level if it exists otherwise it creates a new level and saves it to the repository.
     * code in indexed for look ups in the levels table. Passing the Rack object is required as
     * it is not wanted to have a level which does not have the rack it belongs to already registered.
     * 
     * If the level has not yet been added to the parent rack, the number of levels the parent
     * rack contains is incremented before returning.
     *
     * @param code the level code derived from the QR code
     * @param rack the Rack object this level is present on
     * @return the level with the corresponding code
     */
    @Transactional
    public Level getOrCreateLevel(String code, Rack rack) {
        Optional<Level> optionalLevel = levelRepository.findByRackIdAndCode(rack.getId(), code);
        if (optionalLevel.isPresent()) {
            return optionalLevel.get();
        } else {
            //Create a new level on this rack with the level code and increment num of levels
            Level newLevel = Level.builder(rack).setCode(code).build();
            rack.incrementLevels();

            //Save to the repository and return the level
            return levelRepository.save(newLevel);
        }
    }

    
}
