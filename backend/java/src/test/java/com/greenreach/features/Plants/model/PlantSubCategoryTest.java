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
// ... (same imports)

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
        when(mockCategory.getCycles()).thenReturn(4);
        List<PlantableGrowthStage> catStages = List.of(stage1, stage2);
        when(mockCategory.getGrowthStages()).thenReturn(catStages);

        PlantSubCategory subcat = new PlantSubCategory("Lettuce", mockCategory);

        assertEquals("Lettuce", subcat.getName());
        assertEquals(4, subcat.getCycles());
        assertEquals(catStages, subcat.getGrowthStages());
    }

    @Test
    void constructor_withCustomStagesOverridesCategoryStages() {
        List<PlantableGrowthStage> custom = List.of(customStage1, customStage2);

        PlantSubCategory subcat = new PlantSubCategory("Tomato", 10, mockCategory, custom);

        assertEquals("Tomato", subcat.getName());
        assertEquals(10, subcat.getCycles());
        assertEquals(custom, subcat.getGrowthStages());
    }

    @Test
    void getGrowthStages_returnsUnmodifiableList() {
        when(mockCategory.getCycles()).thenReturn(2);
        List<PlantableGrowthStage> catStages = List.of(stage1);
        when(mockCategory.getGrowthStages()).thenReturn(catStages);

        PlantSubCategory subcat = new PlantSubCategory("Spinach", mockCategory);

        List<PlantableGrowthStage> stages = subcat.getGrowthStages();
        assertThrows(UnsupportedOperationException.class,
                     () -> stages.add(stage2));
    }

    @Test
    void getTypes_returnsCopyAndIsUnmodifiable() throws Exception {
        PlantSubCategory subcat = new PlantSubCategory("Kale", mockCategory);
        List<PlantType> injected = new ArrayList<>();
        injected.add(type1);
        injected.add(type2);

        Field typesField = PlantSubCategory.class.getDeclaredField("types");
        typesField.setAccessible(true);
        typesField.set(subcat, injected);

        List<PlantType> returned = subcat.getTypes();

        assertEquals(2, returned.size());
        assertTrue(returned.contains(type1) && returned.contains(type2));
        assertThrows(UnsupportedOperationException.class,
                     () -> returned.remove(0));
        injected.clear();
        assertEquals(2, returned.size());
    }

    @Test
    void getAndSetCategory() {
        when(mockCategory.getCycles()).thenReturn(1);
        when(mockCategory.getGrowthStages()).thenReturn(Collections.emptyList());

        PlantSubCategory subcat = new PlantSubCategory("Herb", mockCategory);

        assertSame(mockCategory, subcat.getCategory());
        PlantCategory newCat = mock(PlantCategory.class);
        subcat.setCategory(newCat);
        assertSame(newCat, subcat.getCategory());
    }

    @Test
    void setName_changesTheName() {
        when(mockCategory.getCycles()).thenReturn(3);
        when(mockCategory.getGrowthStages()).thenReturn(Collections.emptyList());

        PlantSubCategory subcat = new PlantSubCategory("OldName", mockCategory);
        subcat.setName("NewName");

        assertEquals("NewName", subcat.getName());
    }
}
