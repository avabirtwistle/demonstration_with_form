package com.greenreach.features.location.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import com.greenreach.features.location.model.Locatable;


/**
 * A generic base repository for all location-related entities that have a unique string-based code.
 * 
 * This interface allows any Locatable entity (Room, Zone, Rack, Level, Slot) to be queried or managed
 * by code, reducing repetitive method declarations in each concrete repository.
 *
 * @param <T>  the entity type (must extend Locatable)
 * @param <ID> the type of the entity's primary key
 */
@NoRepositoryBean
public interface LocatableRepository<T extends Locatable, ID> extends JpaRepository<T, ID> {

    /**
     * Retrieves an entity by its code.
     *
     * @param code the unique code for the locatable entity
     * @return an Optional containing the entity if found, or empty if not
     */
    Optional<T> findByCode(String code);

    /**
     * Checks if an entity exists by its code.
     *
     * @param code the unique code for the locatable entity
     * @return true if an entity with the given code exists, false otherwise
     */
    boolean existsByCode(String code);
}
