/**
 * app.js
 * ------
 * Express server — Web Portofolio Personal Bima Respati
 *
 *  - Template : EJS
 *  - Styling : Tailwind CSS (CDN)
 *  - Database: MySQL (mysql2) dengan fallback data dummy
 *
 * Jalankan: npm install && npm start  →  http://localhost:3000
 */

require('dotenv').config();

const path = require('path');
const express = require('express');
const { initDatabase, getProjects, saveMessage, isDbAvailable } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
//  Middleware
// ============================================================

// Parsing data dari form (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
// Parsing JSON body
app.use(express.json());

// Folder aset statis (CSS/JS milik sendiri jika ada)
app.use(express.static(path.join(__dirname, 'public')));

// View engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============================================================
//  Data Statis (terpindah ke res.locals agar bisa dipakai di EJS)
// ============================================================

const portfolio = {
  name: 'Bima Respati',
  role: 'Software Engineering Student | Full-Stack & Backend Developer',
  tagline:
    'Siswa Rekayasa Perangkat Lunak SMK Jakarta Pusat 1 yang berfokus pada pengembangan aplikasi web, arsitektur REST API, dan manajemen basis data.',
  about: [
    'Saya siswa SMK Jakarta Pusat 1 jurusan Rekayasa Perangkat Lunak (RPL) yang fokus pada pengembangan aplikasi web full-stack — mulai dari arsitektur REST API hingga manajemen basis data relasional. Saya percaya bahwa fondasi backend yang solid adalah kunci dari setiap aplikasi yang handal.',
    'Di luar coding, saya aktif dalam kegiatan kepemimpinan organisasi sekolah dan produksi multimedia. Saya terbuka untuk program PKL, proyek freelance, dan kolaborasi di bidang pengembangan perangkat lunak.',
  ],
  skills: [
    {
      category: 'Core Skills',
      icon: 'code-2',
      items: ['Node.js', 'Express.js', 'JavaScript', 'REST API', 'SQL & Relational Database Design'],
    },
    {
      category: 'Working Knowledge',
      icon: 'server',
      items: ['React', 'HTML/CSS', 'Git & GitHub', 'EJS', 'Tailwind CSS', 'Vercel'],
    },
    {
      category: 'Additional Skills',
      icon: 'sparkles',
      items: ['Technical Leadership', 'Problem Solving', 'Video Editing & Multimedia (N-Log Workflow)'],
    },
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/Bim-bim08', icon: 'github' },
  ],
  contacts: {
    email: 'maciuduk@gmail.com',
    github: 'https://github.com/Bim-bim08',
    school: 'SMK Jakarta Pusat 1',
  },
  siteUrl: 'https://porto-mu-taupe.vercel.app',
  education: [
    {
      school: 'SMK Jakarta Pusat 1',
      major: 'Rekayasa Perangkat Lunak (Software Engineering)',
      period: '2024 — 2027',
      desc: 'Mendalami pengembangan aplikasi web full-stack: pemrograman JavaScript, arsitektur REST API, basis data relasional, hingga manajemen proyek perangkat lunak.',
    },
  ],
  experiences: [
    {
      role: 'Student Council / OSIS Core Officer',
      org: 'SMK Jakarta Pusat 1',
      period: '2025 — 2026',
      team: null,
      gitWorkflow: null,
      responsibilities: [
        'Mengkoordinasikan acara dan kunjungan antar-sekolah',
        'Merancang dan menjalankan program kerja organisasi',
        'Berkoordinasi dengan pengurus lain untuk pelaksanaan kegiatan sekolah',
      ],
    },
    {
      role: 'Student Leadership Training Project Lead',
      org: 'Program Kepemimpinan Pelajar',
      period: '2025',
      team: null,
      gitWorkflow: null,
      responsibilities: [
        'Memimpin koordinasi tim dan manajemen proyek kelompok',
        'Mengarahkan perencanaan hingga eksekusi kegiatan pelatihan',
        'Mengembangkan kemampuan komunikasi dan pengambilan keputusan',
      ],
    },
    {
      role: 'Full-Stack / Backend Developer',
      org: 'webRelawan — Platform Relawan',
      period: '2026',
      team: '4 orang',
      gitWorkflow: 'GitHub Flow: Branch → PR → Code Review → Merge',
      responsibilities: [
        'Merancang skema database relasional (8+ tabel: user, komunitas, event, pendaftaran, dll.)',
        'Membangun REST API (Node.js + Express) dengan autentikasi & otorisasi 2 role pengguna',
        'Menjaga kualitas kode lewat code review dan branch protection di GitHub',
        'Integrasi frontend-backend dan persiapan deployment (Vercel)',
      ],
    },
  ],
};

// Sediakan data portfolio + status DB untuk semua view
app.use((req, res, next) => {
  res.locals.portfolio = portfolio;
  res.locals.dbAvailable = isDbAvailable();
  next();
});

// ============================================================
//  Routes
// ============================================================

// ---- GET /  →  Halaman Portofolio ----
app.get('/', async (req, res) => {
  try {
    const projects = await getProjects({ featuredOnly: true });

    // Status flash dari redirect form kontak (?status=success | ?status=error)
    const flash = {
      status: req.query.status || null,
      message: req.query.status === 'success'
        ? 'Pesan berhasil dikirim! Terima kasih sudah menghubungi saya. 🙌'
        : req.query.status === 'error'
          ? 'Pesan gagal dikirim. Silakan coba lagi.'
          : null,
    };

    res.render('index', { projects, flash });
  } catch (err) {
    console.error('❌ Gagal memuat proyek:', err.message);
    res.status(500).render('index', {
      projects: [],
      flash: { status: 'error', message: 'Terjadi kesalahan saat memuat data.' },
    });
  }
});

// ---- POST /contact  →  Simpan pesan form kontak ke database ----
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  // Validasi sederhana di server
  const errors = [];
  if (!name || !name.trim()) errors.push('Nama wajib diisi.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push('Email tidak valid.');
  }
  if (!message || message.trim().length < 10) {
    errors.push('Pesan minimal 10 karakter.');
  }

  if (errors.length > 0) {
    return res.redirect('/?status=error');
  }

  const result = await saveMessage({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  if (result.success) {
    res.redirect('/?status=success');
  } else {
    // DB tidak tersedia / error → tetap kabari user dengan jelas
    res.redirect('/?status=error');
  }
});

// ---- 404 handler (tetap render halaman utama + banner) ----
app.use(async (req, res) => {
  try {
    const projects = await getProjects({ featuredOnly: true });
    res.status(404).render('index', {
      projects,
      flash: { status: 'error', message: 'Halaman tidak ditemukan (404).' },
    });
  } catch {
    res.status(404).send('Halaman tidak ditemukan.');
  }
});

// ============================================================
//  Start Server
// ============================================================

async function start() {
  await initDatabase(); // cek koneksi MySQL (tidak memblokir server)

  const server = app.listen(PORT, () => {
    console.log(`🚀 Portofolio berjalan di: http://localhost:${PORT}`);
  });

  // Tangani port yang sudah dipakai dengan pesan yang ramah
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} sudah digunakan. Ubah nilai PORT di file .env atau tutup proses lain.`);
      process.exit(1);
    }
    throw err;
  });
}

start();
