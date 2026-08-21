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
    title: 'GSPro POS Kasir',
    role: 'Full-Stack Developer',
    description:
      'Sistem pencatatan transaksi dan manajemen stok barang secara real-time untuk skala UMKM/Kantin.',
    problem:
      'Kebutuhan sistem pencatatan transaksi dan manajemen stok barang secara real-time untuk skala UMKM/Kantin.',
    solution:
      'Membangun aplikasi kasir digital berbasis web dengan fitur pencatatan transaksi, pencetakan struk, riwayat pendapatan, dan penyesuaian stok otomatis — semuanya berjalan di browser tanpa dependensi server berat.',
    features:
      'Transaksi kasir, Cetak struk/receipt, Riwayat pendapatan, Penyesuaian stok otomatis',
    metrics:
      'LocalStorage Persistence API, Cetak Struk Digital, Riwayat Transaksi Lengkap, Stok Otomatis',
    tech_stack: 'JavaScript, Node.js, Vercel, LocalStorage Persistence API',
    project_type: 'web',
    link_url: 'https://gspro-pos-kasir.vercel.app/',
    github_url: 'https://github.com/Bim-bim08/gspro-pos-kasir',
    image: 'web_kasir.jpg',
    duration: null,
    video_url: null,
  },
  {
    id: 2,
    title: 'webRelawan (Volunteer Management App)',
    role: 'Full-Stack Developer',
    description:
      'Platform digital untuk koordinasi kegiatan relawan dan manajemen pendaftaran event sosial.',
    problem:
      'Platform digital untuk koordinasi kegiatan relawan dan manajemen pendaftaran event sosial yang sebelumnya masih dilakukan secara manual.',
    solution:
      'Membangun platform web terpusat dengan manajemen pengguna, integrasi pendaftaran kegiatan, dan penanganan alur kerja backend yang stabil untuk menghubungkan komunitas dengan sukarelawan.',
    features:
      'Manajemen pengguna, Integrasi pendaftaran kegiatan, Penanganan alur kerja backend',
    metrics:
      '8+ Tabel Database Relasional, 20+ REST API Endpoints, 2 Role Pengguna, GitHub Flow (Branch → PR → Review)',
    tech_stack: 'Node.js, Express.js, HTML/CSS',
    project_type: 'web',
    link_url: null,
    github_url: 'https://github.com/Bim-bim08',
    image: 'web_relawan.jpg',
    duration: null,
    video_url: null,
  },
  {
    id: 3,
    title: 'Short Film & School Video Project',
    role: 'Director & Lead Editor',
    description:
      'Sutradara dan editor utama untuk produksi film pendek kompetisi serta pembuatan konten multimedia sekolah dengan teknik storyboarding dan color grading profile N-Log.',
    problem:
      'Produksi film pendek dan konten sekolah membutuhkan alur produksi yang terorganisir agar cerita tersampaikan, durasi terkontrol, dan hasil warna konsisten antar-scene.',
    solution:
      'Memimpin produksi dari storyboard, shooting, hingga editing akhir dengan teknik color grading N-Log, ritme narasi yang jelas, dan manajemen jadwal produksi yang ketat.',
    features:
      'Storyboarding, Sutradara produksi, Color grading N-Log, Editing & mixing audio, Manajemen jadwal produksi',
    metrics:
      '5+ Karya Film & Video, Tim 4-5 Orang, Color Grading N-Log, 100% Storyboard Orisinal',
    tech_stack: 'Nikon Z50 (N-Log), Storyboarding, CapCut PC / Video Editing, Directing',
    project_type: 'video',
    link_url: null,
    github_url: null,
    image: 'film.jpg',
    duration: '12:45',
    video_url: null,
  },
  {
    id: 4,
    title: 'School Social Media Content & Creative Production (@smkjpone)',
    role: 'Lead Content Creator & Video Editor',
    description:
      'Mengelola dan memproduksi konten digital Instagram sekolah (@smkjpone), mulai dari dokumentasi acara (MPLS, Lomba 17-an, Webinar), video promosi jurusan, Reels dokumenter harian, hingga pengerjaan visual branding.',
    problem:
      'Sekolah membutuhkan kehadiran digital yang konsisten dan profesional di media sosial untuk meningkatkan visibilitas, menarik siswa baru, serta mendokumentasikan kegiatan sekolah secara menarik.',
    solution:
      'Mengelola strategi konten Instagram @smkjpone secara terencana — mulai dari perencanaan konten, produksi video dokumentasi, editing Reels, hingga visual branding yang konsisten menggunakan color grading N-Log dan CapCut PC.',
    features:
      'Dokumentasi acara sekolah, Video promosi jurusan, Reels dokumenter harian, Visual branding, Content strategy & scheduling',
    metrics:
      '10+ Event Dokumentasi, Reels & Video Pendek, Konsisten Upload, Visual Branding Kolektif',
    tech_stack: 'CapCut PC, Nikon Z50, Content Strategy, Social Media Management, Color Grading',
    project_type: 'video',
    link_url: 'https://instagram.com/smkjpone',
    github_url: null,
    image: 'ss_ig1.png',
    gallery: ['ss_ig1.png', 'ss_ig2.png'],
    duration: null,
    video_url: null,
  },
];

module.exports = dummyProjects;
