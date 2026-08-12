/**
 * data/projects.js
 * -----------------
 * Data proyek cadangan (dummy) yang dipakai saat database MySQL
 * belum terkoneksi (fallback). Struktur field disamakan dengan
 * tabel `projects` pada schema.sql agar seamless.
 */

const dummyProjects = [
  {
    id: 1,
    title: 'webRelawan',
    role: 'Lead / Backend Developer',
    description:
      'Platform aplikasi web relawan untuk menghubungkan komunitas dengan sukarelawan. Mencakup registrasi pengguna, manajemen data, dan integrasi backend yang stabil.',
    tech_stack: 'Node.js, Express, JavaScript, SQL',
    project_type: 'web',
    link_url: null,
    image: 'web_relawan.jpg',
  },
  {
    id: 2,
    title: 'Bimashop / Web Kasir',
    role: 'Full-Stack Developer',
    description:
      'Aplikasi toko online & kasir digital dengan manajemen basis data relasional untuk pengelolaan produk, kategori, brand, dan pencatatan transaksi.',
    tech_stack: 'JavaScript, Node.js, SQL',
    project_type: 'web',
    link_url: null,
    image: 'web_kasir.jpg',
  },
  {
    id: 3,
    title: 'Short Film & School Video Content',
    role: 'Video Editor & Director',
    description:
      'Sutradara & editor utama karya film pendek kompetisi serta pembuat konten harian sekolah dengan teknik color grading (N-Log) dan storyboarding.',
    tech_stack: 'CapCut PC, Camera Gear, Color Grading',
    project_type: 'video',
    link_url: null,
    image: 'film.jpg',
  },
];

module.exports = dummyProjects;
