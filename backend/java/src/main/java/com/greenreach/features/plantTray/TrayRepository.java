package com.greenreach.features.plantTray;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrayRepository extends JpaRepository<Tray, Long> {

    /**
     * Finds a tray by its unique QR code.
     *
     * @param code the tray QR suffix (e.g., "TRAYABC123")
     * @return Optional containing the tray if found, or empty
     */
    Optional<Tray> findByCode(String code);

    /**
     * Finds all the trays that have the current status.
     *
     * @param status the status of the plants
     * @return Optional containing the tray if found, or empty
     */
    Optional<List<Tray>> findByStatus(TrayStatus status);

    /**
     * Finds a tray by its QR code only if its status is something other than UNASSIGNED.
     */
    Optional<Tray> findByCodeAndStatusNot(String code, TrayStatus status);

    // Find trays that are not READY and whose stage is due or overdue
    List<Tray> findByNextStageDateLessThanEqualAndStatusNot(LocalDate date, TrayStatus status);
}