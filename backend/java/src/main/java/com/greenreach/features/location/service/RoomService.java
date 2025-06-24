package com.greenreach.features.location.service;
import com.greenreach.features.location.model.Room;
import com.greenreach.features.location.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Optional<Room> getRoomByCode(String code) {
        return roomRepository.findByCode(code);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}

