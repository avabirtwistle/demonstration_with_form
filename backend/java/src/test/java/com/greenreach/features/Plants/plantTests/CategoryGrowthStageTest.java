package com.greenreach.features.Plants.plantTests;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.transaction.annotation.Transactional;

import com.greenreach.features.Plants.CategoryGrowthStage;
import com.greenreach.features.Plants.CategoryGrowthStageRepository;
import com.greenreach.features.Plants.GrowthStageType;
import com.greenreach.features.Plants.PlantCategory;
import com.greenreach.features.Plants.PlantCategoryRepository;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class CategoryGrowthStageTest {

    @Autowired
    private CategoryGrowthStageRepository stageRepo;

    @Autowired
    private PlantCategoryRepository categoryRepo;

    @Test
    public void testSaveCategoryGrowthStage() {
        PlantCategory category = new PlantCategory();
        category.setName("Test Category");
        categoryRepo.save(category);

        CategoryGrowthStage stage = new CategoryGrowthStage();
        stage.setStageName(GrowthStageType.SEEDLING);
        stage.setDurationDays(5);
        stage.setOrderIndex(1);
        stage.setCategory(category);
        stageRepo.save(stage);

        CategoryGrowthStage result = stageRepo.findById(stage.getId()).orElse(null);
        assertNotNull(result);
        assertEquals("Test Category", result.getCategory().getName());
    }

    @Test
public void testUpdateCategoryGrowthStage() {
    PlantCategory category = new PlantCategory();
    category.setName("Update Category");
    categoryRepo.save(category);

    CategoryGrowthStage stage = new CategoryGrowthStage();
    stage.setStageName(GrowthStageType.SEEDLING);
    stage.setDurationDays(3);
    stage.setOrderIndex(0);
    stage.setCategory(category);
    stageRepo.save(stage);

    stage.setDurationDays(7);
    stageRepo.save(stage);

    CategoryGrowthStage updated = stageRepo.findById(stage.getId()).orElse(null);
    assertNotNull(updated);
    assertEquals(7, updated.getDurationDays());
}

@Test
public void testDeleteCategoryGrowthStage() {
    PlantCategory category = new PlantCategory();
    category.setName("Delete Category");
    categoryRepo.save(category);

    CategoryGrowthStage stage = new CategoryGrowthStage();
    stage.setStageName(GrowthStageType.VEGETATIVE);
    stage.setDurationDays(10);
    stage.setOrderIndex(2);
    stage.setCategory(category);
    stageRepo.save(stage);

    Long id = stage.getId();
    stageRepo.delete(stage);

    assertFalse(stageRepo.findById(id).isPresent());
}

@Test
public void testMultipleStagesPerCategory() {
    PlantCategory category = new PlantCategory();
    category.setName("MultiStage Category");
    categoryRepo.save(category);

    CategoryGrowthStage stage1 = new CategoryGrowthStage();
    stage1.setStageName(GrowthStageType.SEEDLING);
    stage1.setDurationDays(4);
    stage1.setOrderIndex(0);
    stage1.setCategory(category);

    CategoryGrowthStage stage2 = new CategoryGrowthStage();
    stage2.setStageName(GrowthStageType.FLOWERING);
    stage2.setDurationDays(8);
    stage2.setOrderIndex(1);
    stage2.setCategory(category);

    stageRepo.save(stage1);
    stageRepo.save(stage2);

    assertEquals(2, stageRepo.findAll().stream()
        .filter(s -> s.getCategory().getId().equals(category.getId()))
        .count());
}

}
