package com.greenreach.features.plants.model;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.greenreach.features.plants.model.PlantCategory;
import com.greenreach.features.plants.model.PlantSubCategory;
import com.greenreach.features.plants.model.PlantType;
import com.greenreach.features.plants.model.PlantableGrowthStage;

/**
 * Unit tests for {@link PlantSubCategory}.
 */
@ExtendWith(MockitoExtension.class)
class PlantSubCategoryTest {

    @Mock
    private PlantCategory mockCategory;

    @Mock
    private PlantableGrowthStage stage1, stage2, customStage1, customStage2;

    @Mock
    private PlantType type1, type2;

    @Test
    void constructor_inheritsCyclesAndStagesFromCategory() {
        // Arrange
        when(mockCategory.getCycles()).thenReturn(4);
        List<PlantableGrowthStage> catStages = List.of(stage1, stage2);
        when(mockCategory.getStages()).thenReturn(catStages);

        // Act
        PlantSubCategory subcat = new PlantSubCategory("Lettuce", mockCategory);

        // Assert
        assertEquals("Lettuce", subcat.getName(), "Name should be set from constructor");
        assertEquals(4, subcat.getCycles(), "Cycles should be inherited from category");
        assertEquals(catStages, subcat.getGrowthStages(), "Should inherit the same stages list");
    }

    @Test
    void constructor_withCustomStagesOverridesCategoryStages() {
        // Arrange: no need to stub mockCategory.getCycles() since explicit cycles passed
        List<PlantableGrowthStage> custom = List.of(customStage1, customStage2);

        // Act
        PlantSubCategory subcat = new PlantSubCategory("Tomato", 10, mockCategory, custom);

        // Assert
        assertEquals("Tomato", subcat.getName());
        assertEquals(10, subcat.getCycles(), "Cycles should come from explicit constructor arg");
        assertEquals(custom, subcat.getGrowthStages(), "getGrowthStages() should return the custom list provided");
    }

    @Test
    void getGrowthStages_returnsUnmodifiableList() {
        // Arrange
        when(mockCategory.getCycles()).thenReturn(2);
        List<PlantableGrowthStage> catStages = List.of(stage1);
        when(mockCategory.getStages()).thenReturn(catStages);
        PlantSubCategory subcat = new PlantSubCategory("Spinach", mockCategory);

        // Act & Assert
        List<PlantableGrowthStage> stages = subcat.getGrowthStages();
        assertThrows(UnsupportedOperationException.class,
                     () -> stages.add(stage2),
                     "Returned growth‐stages list must be unmodifiable");
    }

    @Test
    void getTypes_returnsCopyAndIsUnmodifiable() throws Exception {
        // Arrange: inject an ArrayList into private 'types' field
        PlantSubCategory subcat = new PlantSubCategory("Kale", mockCategory);
        List<PlantType> injected = new ArrayList<>();
        injected.add(type1);
        injected.add(type2);

        Field typesField = PlantSubCategory.class.getDeclaredField("types");
        typesField.setAccessible(true);
        typesField.set(subcat, injected);

        // Act
        List<PlantType> returned = subcat.getTypes();

        // Assert
        assertEquals(2, returned.size());
        assertTrue(returned.contains(type1) && returned.contains(type2));
        assertThrows(UnsupportedOperationException.class,
                     () -> returned.remove(0),
                     "getTypes() must return an unmodifiable copy");
        injected.clear();
        assertEquals(2, returned.size(), "Returned list should not reflect later changes");
    }

    @Test
    void getAndSetCategory() {
        // Arrange
        when(mockCategory.getCycles()).thenReturn(1);
        when(mockCategory.getStages()).thenReturn(Collections.emptyList());
        PlantSubCategory subcat = new PlantSubCategory("Herb", mockCategory);

        // Act & Assert
        assertSame(mockCategory, subcat.getCategory(), "getCategory() should return what was passed in");
        PlantCategory newCat = mock(PlantCategory.class);
        subcat.setCategory(newCat);
        assertSame(newCat, subcat.getCategory(), "After setCategory(), getCategory() must return the new value");
    }

    @Test
    void setName_changesTheName() {
        // Arrange
        when(mockCategory.getCycles()).thenReturn(3);
        when(mockCategory.getStages()).thenReturn(Collections.emptyList());
        PlantSubCategory subcat = new PlantSubCategory("OldName", mockCategory);

        // Act
        subcat.setName("NewName");

        // Assert
        assertEquals("NewName", subcat.getName(), "setName() should update the name");
    }
}
