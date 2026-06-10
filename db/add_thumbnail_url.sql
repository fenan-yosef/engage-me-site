-- Run this on production to add thumbnail support for work items
-- mysql -u <user> -p <database> < db/add_thumbnail_url.sql

ALTER TABLE cms_work_items ADD COLUMN thumbnail_url VARCHAR(512) NULL AFTER banner_url;
