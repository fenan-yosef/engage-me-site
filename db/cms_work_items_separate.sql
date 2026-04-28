-- Work items table with separate left/right images
-- Run this after creating the database referenced by CMS_DB_NAME.

ALTER TABLE cms_work_items 
ADD COLUMN left_images JSON NULL,
ADD COLUMN right_image VARCHAR(512) NULL;

UPDATE cms_work_items SET left_images = JSON_ARRAY(content_images), right_image = NULL WHERE content_images IS NOT NULL;

ALTER TABLE cms_work_items DROP COLUMN content_images;