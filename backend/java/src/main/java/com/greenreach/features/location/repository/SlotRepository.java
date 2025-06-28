package com.greenreach.features.location.repository;

import com.greenreach.features.location.model.Slot;

import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SlotRepository extends JpaRepository<Slot, Long> {
    Optional<Slot> findByCode(String code);
    List<Slot> findByOccupied(Integer occupied); 

    /**
     * Finds a Slot by its code and the ID of the Level it belongs to.
     * 
     * @param levelId the ID of the level containing the slot
     * @param slotCode the code of the slot which is fully unique.
     * @return an Optional containing the Slot if found, otherwise empty
     */
    Optional<Slot> findByLevelIdAndCode(Long levelId, String slotCode);
        
    @Query("""
        SELECT s FROM Slot s
        JOIN FETCH s.level l
        JOIN FETCH l.rack r
        JOIN FETCH r.zone z
        JOIN FETCH z.room
        WHERE s.occupied = 0
    """)
    List<Slot> findAllFreeSlots(Pageable pageable); 

}
