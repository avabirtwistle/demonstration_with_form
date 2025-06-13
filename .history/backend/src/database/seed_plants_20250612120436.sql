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


-- seed the racks
INSERT INTO rack
  (rack_qr_id);
VALUES
  ('02');

-- seed the levels
INSERT INTO level
  (level_qr_id, rackid, level_num);
VALUES
  ('02', (SELECT rack_id FROM rack WHERE rack_qr_id='02',2));

-- seed the slots
INSERT INTO slot_index
  (slot_qr_id, level_id, slot_qr_code, slot_number, occupied);
VALUES
  ('BBF0E845', (SELECT level_id FROM level WHERE level_qr_id = '02'), '01', 0),
  ('D40C593C', (SELECT level_id FROM level WHERE level_qr_id = '02'), '02', 0),
  ('1479B1DF', (SELECT level_id FROM level WHERE level_qr_id = '02'), '03', 0),
  ('BC765150', (SELECT level_id FROM level WHERE level_qr_id = '02'), '04', 0),
  ('C597B478', (SELECT level_id FROM level WHERE level_qr_id = '02'), '05', 0),
  ('9ED26EE1', (SELECT level_id FROM level WHERE level_qr_id = '02'), '06', 0),
  ('2D54438C', (SELECT level_id FROM level WHERE level_qr_id = '02'), '07', 0),
  ('D3BD2FA8', (SELECT level_id FROM level WHERE level_qr_id = '02'), '08', 0);

COMMIT;