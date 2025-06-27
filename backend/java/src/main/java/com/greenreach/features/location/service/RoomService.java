package com.greenreach.features.location.service;
import com.greenreach.features.location.model.Room;
import com.greenreach.features.location.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    /**
     * Looks up a Room by the roomCode and returns the room if it exists otherwise it creates a new room and saves it to the repository.
     * code in indexed for look ups in the rooms table.
     *
     * @param code the room code derived from the QR code
     * @return the room with the corresponding code
     */
    @Transactional
    public Room getOrCreateRoom(String code) {
        Optional<Room> optionalRoom = roomRepository.findByCode(code);
        if (optionalRoom.isPresent()) {
            return optionalRoom.get();
        } else {
            Room newRoom = Room.builder().setCode(code).build();
            return roomRepository.save(newRoom);
        }
    }
}

