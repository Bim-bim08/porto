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
  link_url      VARCHAR(255)  DEFAULT NULL,        -- link live demo
  github_url    VARCHAR(255)  DEFAULT NULL,        -- link repository GitHub
  problem       TEXT          DEFAULT NULL,        -- masalah yang dipecahkan (case study)
  solution      TEXT          DEFAULT NULL,        -- solusi yang diterapkan (case study)
  features      VARCHAR(500)  DEFAULT NULL,        -- fitur utama, dipisah koma (case study)
  metrics       VARCHAR(500)  DEFAULT NULL,        -- metrik proyek nyata, dipisah koma (mis. "8+ Tabel Database")
  duration      VARCHAR(20)   DEFAULT NULL,        -- durasi video (mis. "12:45")
  video_url     VARCHAR(255)  DEFAULT NULL,        -- link video (YouTube) untuk embed player
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
INSERT INTO projects (
  title, role, description, problem, solution, features, metrics,
  tech_stack, project_type, link_url, github_url, image, duration, video_url
) VALUES
(
  'webRelawan',
  'Lead / Backend Developer',
  'Platform aplikasi web relawan untuk menghubungkan komunitas dengan sukarelawan. Mencakup registrasi pengguna, manajemen data, dan integrasi backend yang stabil.',
  'Koordinasi antara komunitas dan sukarelawan masih berjalan manual lewat chat dan spreadsheet, sehingga data pendaftar mudah tercecer, duplikat, dan sulit dipantau oleh pengurus.',
  'Membangun platform web terpusat dengan registrasi pengguna, manajemen data relawan, dan dashboard admin agar seluruh proses pendaftaran hingga penugasan bisa dikelola dalam satu sistem yang rapi.',
  'Registrasi & login pengguna, Manajemen data relawan, Dashboard admin, Pencarian komunitas, Ekspor data',
  '8+ Tabel Database Relasional, 20+ REST API Endpoints, 2 Role Pengguna, GitHub Flow (Branch → PR → Review)',
  'Node.js, Express, JavaScript, SQL',
  'web',
  NULL,
  'https://github.com/bimarespati/webrelawan',
  'web_relawan.jpg',
  NULL,
  NULL
),
(
  'Bimashop / Web Kasir',
  'Full-Stack Developer',
  'Aplikasi toko online & kasir digital dengan manajemen basis data relasional untuk pengelolaan produk, kategori, brand, dan pencatatan transaksi.',
  'Toko kecil masih mencatat produk dan transaksi secara manual (buku/kalkulator), sehingga stok sering tidak akurat dan laporan penjualan sulit dibuat.',
  'Mengembangkan aplikasi kasir digital berbasis web dengan basis data relasional untuk mengelola produk, kategori, brand, dan transaksi secara terstruktur serta mudah diakses dari berbagai perangkat.',
  'Manajemen produk & kategori, Pencatatan transaksi, Kelola brand, Pelacakan stok, Riwayat penjualan',
  '4+ Tabel Database (Produk, Kategori, Brand, Transaksi), REST API Endpoints, Pelacakan Stok, Riwayat Transaksi',
  'JavaScript, Node.js, SQL',
  'web',
  'https://gspro-pos-kasir.vercel.app/',
  'https://github.com/bimarespati/bimashop',
  'web_kasir.jpg',
  NULL,
  NULL
),
(
  'Short Film & School Video Content',
  'Video Editor & Director',
  'Sutradara & editor utama karya film pendek kompetisi serta pembuat konten harian sekolah dengan teknik color grading (N-Log) dan storyboarding.',
  'Produksi film pendek dan konten sekolah membutuhkan alur produksi yang terorganisir agar cerita tersampaikan, durasi terkontrol, dan hasil warna konsisten antar-scene.',
  'Memimpin produksi dari storyboard, shooting, hingga editing akhir dengan teknik color grading N-Log, ritme narasi yang jelas, dan manajemen jadwal produksi yang ketat.',
  'Storyboarding, Sutradara produksi, Color grading N-Log, Editing & mixing audio, Manajemen jadwal produksi',
  '5+ Karya Film & Video, Tim 4-5 Orang, Color Grading N-Log, 100% Storyboard Orisinal',
  'CapCut PC, Camera Gear, N-Log Color Grading',
  'video',
  NULL,
  NULL,
  'film.jpg',
  '12:45',
  NULL
);
