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
  role: 'Software Engineering Student & Content Creator',
  tagline: 'Building Functional Web Applications & Crafting Engaging Visual Stories',
  about: [
    'Saya siswa SMK Rekayasa Perangkat Lunak (RPL) yang fokus mendalami Software Engineering — khususnya pengembangan web full-stack (Node.js, Express, dan database relasional) — sekaligus aktif dalam produksi video dan konten visual.',
    'Tujuan saya adalah menjadi software engineer yang juga mampu bercerita lewat visual. Saya terbuka untuk program PKL, proyek freelance, dan kolaborasi — baik di bidang pengembangan aplikasi web maupun produksi video.',
  ],
  skills: [
    {
      category: 'Programming',
      icon: 'code-2',
      items: ['JavaScript', 'Python'],
    },
    {
      category: 'Web & Backend',
      icon: 'server',
      items: [
        'Node.js',
        'Express',
        'EJS',
        'REST API',
        'SQL (Relational Database)',
        'Authentication',
        'Vercel Deployment',
        'HTML5',
        'CSS3',
      ],
    },
    {
      category: 'Tools',
      icon: 'wrench',
      items: ['Git', 'GitHub', 'VS Code'],
    },
    {
      category: 'Video & Multimedia',
      icon: 'clapperboard',
      items: ['CapCut PC', 'Color Grading (N-Log)', 'Videography'],
    },
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/bimarespati', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/bimarespati', icon: 'linkedin' },
    { label: 'Instagram', url: 'https://instagram.com/res_auditore', icon: 'instagram' },
  ],
  contacts: {
    email: 'bimarespati@gmail.com',
    whatsapp: 'https://wa.me/6283871267899',
    github: 'https://github.com/bimarespati',
    linkedin: 'https://linkedin.com/in/bimarespati',
  },
  siteUrl: 'https://porto-mu-taupe.vercel.app',
  education: [
    {
      school: 'SMK Jakarta Pusat 1',
      major: 'Rekayasa Perangkat Lunak (Software Engineering)',
      period: '2023 — Sekarang',
      desc: 'Mendalami pengembangan aplikasi web full-stack: pemrograman JavaScript, basis data relasional, hingga manajemen proyek perangkat lunak.',
    },
  ],
  experiences: [
    {
      role: 'Lead / Backend Developer',
      org: 'webRelawan — Platform Relawan (Proyek PKL)',
      period: '2024 — Sekarang',
      team: '4 orang',
      gitWorkflow: 'GitHub Flow: Branch → PR → Code Review → Merge',
      responsibilities: [
        'Merancang skema database relasional (8+ tabel: user, komunitas, event, pendaftaran, dll.)',
        'Membangun REST API (Node.js + Express) dengan autentikasi & otorisasi 2 role pengguna',
        'Menjaga kualitas kode lewat code review dan branch protection di GitHub',
        'Integrasi frontend-backend dan persiapan deployment (Vercel)',
      ],
    },
    {
      role: 'Sutradara & Editor Utama',
      org: 'Produksi Video Sekolah & Kompetisi Film',
      period: '2023 — Sekarang',
      team: '4-5 orang',
      gitWorkflow: 'Workflow Produksi: Storyboard → Shooting → Editing → Color Grading',
      responsibilities: [
        'Memimpin rapat produksi dan pembagian tugas antar anggota tim',
        'Menyusun storyboard dan manajemen jadwal shooting',
        'Editing, mixing audio, dan color grading N-Log (CapCut PC) hingga hasil akhir',
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
