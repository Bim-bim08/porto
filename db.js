/**
 * db.js
 * -----
 * Manajemen koneksi MySQL menggunakan mysql2/promise (connection pool).
 *
 * Fitur utama:
 *  - Pool koneksi yang aman untuk production.
 *  - Deteksi otomatis apakah database tersedia.
 *  - Jika DB tidak tersedia dan DB_FALLBACK=true, aplikasi tetap
 *    berjalan dengan data dummy (lihat data/projects.js).
 */

require('dotenv').config();

const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portofolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Hindari error fatal ketika koneksi terputus
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Pool dibuat secara lazy — tidak langsung connect saat file di-load,
// sehingga server tetap bisa start walaupun MySQL belum hidup.
const pool = mysql.createPool(dbConfig);

let dbAvailable = false;

/**
 * Cek koneksi ke database sekali saat server start.
 * Hasilnya disimpan di variabel `dbAvailable`.
 */
async function initDatabase() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    dbAvailable = true;
    console.log('✅ Database MySQL terhubung:', dbConfig.database);
  } catch (err) {
    dbAvailable = false;
    console.warn(
      '⚠️  MySQL tidak dapat dijangkau. Aplikasi berjalan dengan data dummy.\n' +
        `   Detail: ${err.message}\n` +
        '   Pastikan MySQL aktif dan file .env sudah benar.'
    );
  }
  return dbAvailable;
}

/**
 * Ambil daftar proyek.
 * - Jika DB tersedia: SELECT dari tabel `projects` (featured saja).
 * - Jika tidak: return dummy data.
 */
async function getProjects({ featuredOnly = true } = {}) {
  if (!dbAvailable) return require('./data/projects');

  const where = featuredOnly ? 'WHERE is_featured = 1' : '';
  const [rows] = await pool.query(
    `SELECT id, title, role, description, tech_stack, project_type,
            link_url, image, is_featured
       FROM projects
       ${where}
      ORDER BY is_featured DESC, created_at ASC`
  );
  return rows;
}

/**
 * Simpan pesan dari form kontak ke tabel `messages`.
 * Mengembalikan { success, error? }
 */
async function saveMessage({ name, email, message }) {
  if (!dbAvailable) {
    return {
      success: false,
      error: 'Penyimpanan database sedang tidak tersedia.',
    };
  }

  try {
    await pool.query(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    return { success: true };
  } catch (err) {
    console.error('❌ Gagal menyimpan pesan:', err.message);
    return { success: false, error: 'Terjadi kesalahan pada server.' };
  }
}

module.exports = { pool, initDatabase, getProjects, saveMessage, isDbAvailable: () => dbAvailable };
