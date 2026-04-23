-- Minimal CMS schema (starting with Home and the existing block editor).
-- Run this after creating the database referenced by CMS_DB_NAME.

CREATE TABLE IF NOT EXISTS cms_pages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(64) NOT NULL,
  title VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_cms_pages_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_page_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  page_id BIGINT UNSIGNED NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  url VARCHAR(512) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_cms_page_images_page_order (page_id, sort_order),
  CONSTRAINT fk_cms_page_images_page FOREIGN KEY (page_id) REFERENCES cms_pages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_blocks (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  page_id BIGINT UNSIGNED NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  type ENUM('heading','text','image','gallery') NOT NULL,
  block_key VARCHAR(64) NULL,
  text LONGTEXT NULL,
  image_url VARCHAR(512) NULL,
  image_alt VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_cms_blocks_page_order (page_id, sort_order),
  UNIQUE KEY uniq_cms_blocks_page_key (page_id, block_key),
  CONSTRAINT fk_cms_blocks_page FOREIGN KEY (page_id) REFERENCES cms_pages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_block_gallery_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  block_id BIGINT UNSIGNED NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  url VARCHAR(512) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_cms_gallery_block_order (block_id, sort_order),
  CONSTRAINT fk_cms_gallery_block FOREIGN KEY (block_id) REFERENCES cms_blocks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
