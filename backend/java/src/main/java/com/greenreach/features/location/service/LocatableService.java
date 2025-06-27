package com.greenreach.features.location.service;

import com.greenreach.features.location.model.Locatable;

public interface LocatableService<T extends Locatable> {

    /**
     * Get an existing entity by its code, or create and save one if it doesn't exist.
     *
     * @param code the unique code for the locatable entity
     * @return the existing or newly created entity
     */
    T getOrCreateByCode(String code);
}