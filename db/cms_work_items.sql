-- Work items table for dynamic work detail pages
-- Run this after creating the database referenced by CMS_DB_NAME.

CREATE TABLE IF NOT EXISTS cms_work_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  banner_url VARCHAR(512) NULL,
  thumbnail_url VARCHAR(512) NULL,
  description LONGTEXT NULL,
  content_images JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_cms_work_items_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;