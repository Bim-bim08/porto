-- ============================================================
--  Web Portofolio Personal — Bima Respati
--  Struktur Database MySQL
--
--  Cara pakai:
--  1. mysql -u root -p < schema.sql
--  2. Pastikan kredensial di .env sesuai (DB_NAME=portofolio_db)
-- ============================================================

CREATE DATABASE IF NOT EXISTS portofolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portofolio_db;

-- ------------------------------------------------------------
--  Tabel: projects
--  Menyimpan data proyek yang ditampilkan di halaman portfolio
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(150)  NOT NULL,
  role          VARCHAR(100)  NOT NULL,            -- contoh: "Lead / Backend Developer"
  description   TEXT          NOT NULL,
  tech_stack    VARCHAR(255)  NOT NULL,            -- dipisah koma, contoh: "Node.js, Express, SQL"
  project_type  ENUM('web', 'video') DEFAULT 'web',-- kategori tampilan (web / video)
  link_url      VARCHAR(255)  DEFAULT NULL,        -- link live demo / repository
  image         VARCHAR(255)  DEFAULT NULL,        -- nama file gambar di /public/images
  is_featured   TINYINT(1)    DEFAULT 1,           -- 1 = tampil di bagian Featured
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------
--  Tabel: messages
--  Menyimpan pesan dari form kontak (POST /contact)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(150) NOT NULL,
  message     TEXT         NOT NULL,
  is_read     TINYINT(1)   DEFAULT 0,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
--  SAMPLE DATA — 3 Proyek Utama
-- ============================================================
INSERT INTO projects (title, role, description, tech_stack, project_type, link_url, image) VALUES
(
  'webRelawan',
  'Lead / Backend Developer',
  'Platform aplikasi web relawan untuk menghubungkan komunitas dengan sukarelawan. Mencakup registrasi pengguna, manajemen data, dan integrasi backend yang stabil.',
  'Node.js, Express, JavaScript, SQL',
  'web',
  NULL,
  'web_relawan.jpg'
),
(
  'Bimashop / Web Kasir',
  'Full-Stack Developer',
  'Aplikasi toko online & kasir digital dengan manajemen basis data relasional untuk pengelolaan produk, kategori, brand, dan pencatatan transaksi.',
  'JavaScript, Node.js, SQL',
  'web',
  NULL,
  'web_kasir.jpg'
),
(
  'Short Film & School Video Content',
  'Video Editor & Director',
  'Sutradara & editor utama karya film pendek kompetisi serta pembuat konten harian sekolah dengan teknik color grading (N-Log) dan storyboarding.',
  'CapCut PC, Camera Gear, Color Grading',
  'video',
  NULL,
  'film.jpg'
);
