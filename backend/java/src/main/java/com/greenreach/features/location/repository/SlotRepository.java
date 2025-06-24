package com.greenreach.features.location.repository;

import com.greenreach.features.location.model.Slot;

import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


//Because we are extending the JPA repository we have methods such asc
public interface SlotRepository extends JpaRepository<Slot, Long> {
    Optional<Slot> findByQr(String code);
    List<Slot> findByOccupiedFalse();
    
    @Query("""
    SELECT s FROM Slot s
    JOIN FETCH s.level l
    JOIN FETCH l.rack r
    JOIN FETCH r.zone z
    JOIN FETCH z.room
    WHERE s.occupied = false
""")
List<Slot> findAllFreeSlots(Pageable pageable);

}
