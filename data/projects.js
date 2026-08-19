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
    problem:
      'Koordinasi antara komunitas dan sukarelawan masih berjalan manual lewat chat dan spreadsheet, sehingga data pendaftar mudah tercecer, duplikat, dan sulit dipantau oleh pengurus.',
    solution:
      'Membangun platform web terpusat dengan registrasi pengguna, manajemen data relawan, dan dashboard admin agar seluruh proses pendaftaran hingga penugasan bisa dikelola dalam satu sistem yang rapi.',
    features:
      'Registrasi & login pengguna, Manajemen data relawan, Dashboard admin, Pencarian komunitas, Ekspor data',
    metrics:
      '8+ Tabel Database Relasional, 20+ REST API Endpoints, 2 Role Pengguna, GitHub Flow (Branch → PR → Review)',
    tech_stack: 'Node.js, Express, JavaScript, SQL',
    project_type: 'web',
    link_url: null,
    github_url: 'https://github.com/bimarespati/webrelawan',
    image: 'web_relawan.jpg',
    duration: null,
    video_url: null,
  },
  {
    id: 2,
    title: 'Bimashop / Web Kasir',
    role: 'Full-Stack Developer',
    description:
      'Aplikasi toko online & kasir digital dengan manajemen basis data relasional untuk pengelolaan produk, kategori, brand, dan pencatatan transaksi.',
    problem:
      'Toko kecil masih mencatat produk dan transaksi secara manual (buku/kalkulator), sehingga stok sering tidak akurat dan laporan penjualan sulit dibuat.',
    solution:
      'Mengembangkan aplikasi kasir digital berbasis web dengan basis data relasional untuk mengelola produk, kategori, brand, dan transaksi secara terstruktur serta mudah diakses dari berbagai perangkat.',
    features:
      'Manajemen produk & kategori, Pencatatan transaksi, Kelola brand, Pelacakan stok, Riwayat penjualan',
    metrics:
      '4+ Tabel Database (Produk, Kategori, Brand, Transaksi), REST API Endpoints, Pelacakan Stok, Riwayat Transaksi',
    tech_stack: 'JavaScript, Node.js, SQL',
    project_type: 'web',
    link_url: 'https://gspro-pos-kasir.vercel.app/',
    github_url: 'https://github.com/bimarespati/bimashop',
    image: 'web_kasir.jpg',
    duration: null,
    video_url: null,
  },
  {
    id: 3,
    title: 'Short Film & School Video Content',
    role: 'Video Editor & Director',
    description:
      'Sutradara & editor utama karya film pendek kompetisi serta pembuat konten harian sekolah dengan teknik color grading (N-Log) dan storyboarding.',
    problem:
      'Produksi film pendek dan konten sekolah membutuhkan alur produksi yang terorganisir agar cerita tersampaikan, durasi terkontrol, dan hasil warna konsisten antar-scene.',
    solution:
      'Memimpin produksi dari storyboard, shooting, hingga editing akhir dengan teknik color grading N-Log, ritme narasi yang jelas, dan manajemen jadwal produksi yang ketat.',
    features:
      'Storyboarding, Sutradara produksi, Color grading N-Log, Editing & mixing audio, Manajemen jadwal produksi',
    metrics: '5+ Karya Film & Video, Tim 4-5 Orang, Color Grading N-Log, 100% Storyboard Orisinal',
    tech_stack: 'CapCut PC, Camera Gear, N-Log Color Grading',
    project_type: 'video',
    link_url: null,
    github_url: null,
    image: 'film.jpg',
    duration: '12:45',
    video_url: null,
  },
];

module.exports = dummyProjects;
