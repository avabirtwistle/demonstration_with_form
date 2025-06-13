BEGIN TRANSACTION;

-- seed categories
INSERT INTO plant_categories (category_name) VALUES
  ('Leafy Greens'),
  ('Herbs'),
  ('Fruiting Plants'),
  ('Microgreens');

-- seed plants
INSERT INTO plants
  (plant_name, parent_category, plant_subcat, days_germ, days_seedling, days_veg, days_flower, harvest_cycles, days_between)
VALUES
  --lettuces
  ('Leaf Lettuce', (SELECT category_id FROM plant_categories WHERE category_name='Leafy Greens'), 'Lettuce',4,6,18,0,3,9),
  ('Romaine Lettuce', (SELECT category_id FROM plant_categories WHERE category_name='Leafy Greens'), 'Lettuce',4,8,24,0,1,0),
  ('Butterhead Lettuce', (SELECT category_id FROM plant_categories WHERE category_name='Leafy Greens'), 'Lettuce',4,8,26,0,1,0),
  --other leafy greens
  ('Kale', (SELECT category_id FROM plant_categories WHERE category_name='Leafy Greens'), 'Generic',5,12,35,0,4,12),
  ('Spinach', (SELECT category_id FROM plant_categories WHERE category_name='Leafy Greens'), 'Generic',6,11,25,0,3,9),
  ('Arugula', (SELECT category_id FROM plant_categories WHERE category_name='Leafy Greens'), 'Generic',4,6,22,0,3,8),
  ('Swiss Chard', (SELECT category_id FROM plant_categories WHERE category_name='Leafy Greens'), 'Rainbow',6,12,36,0,4,10),
  --herbs
  ('Italian Basil', (SELECT category_id FROM plant_categories WHERE category_name='Herbs'), 'Basil',6,12,32,0,5,10),
  ('Cinnamon Basil', (SELECT category_id FROM plant_categories WHERE category_name='Herbs'), 'Basil',6,12,32,0,5,10),
  ('Lemon Basil', (SELECT category_id FROM plant_categories WHERE category_name='Herbs'), 'Basil',6,12,32,0,5,10),
  ('Cilantro', (SELECT category_id FROM plant_categories WHERE category_name='Herbs'), 'Generic',6,12,28,0,2,11),
  ('Parsley', (SELECT category_id FROM plant_categories WHERE category_name='Herbs'), 'Generic',8,12,36,0,3,12),
  ('Mint', (SELECT category_id FROM plant_categories WHERE category_name='Herbs'), 'Generic',8,16,40,0,-1,10),
  -- Fruiting
  ('Albion Strawberry', (SELECT category_id FROM plant_categories WHERE category_name='Fruiting Plants'), 'Strawberry',10,20,30,28,5,7);

COMMIT;
