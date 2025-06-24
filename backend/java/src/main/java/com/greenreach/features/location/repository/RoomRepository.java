package com.greenreach.features.location.repository;

import com.greenreach.features.location.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByCode(String code);
    
}
