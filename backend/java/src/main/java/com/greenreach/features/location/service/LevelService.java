package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Level;
import com.greenreach.features.location.model.Rack;
import com.greenreach.features.location.repository.LevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LevelService {

    private final LevelRepository levelRepository;

    @Autowired
    public LevelService(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    public Level createLevel(Level level) {
        return levelRepository.save(level);
    }

    public void createLevelsForRack(String rackCodePrefix, int numLevels, Rack rack) {
        for (int i = 1; i <= numLevels; i++) {
            String levelCode = rackCodePrefix + "-LVL-" + i;
            Level level = Level.builder()
                .setCode(levelCode)
                .setRack(rack)
                .build();
            levelRepository.save(level);
        }
    }

    public List<Level> getAllLevels() {
        return levelRepository.findAll();
    }
}
