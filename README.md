# 🚀 Portofolio Personal — Bima Respati

Web Portofolio Personal berbasis **Node.js + Express + EJS + MySQL**, dengan tampilan **Premium Iron Spider / Spider-Verse** (Tailwind CSS via CDN, palet putih bersih dengan aksen maroon `red-900`, navy `slate-950`, dan gold `amber-500/600`; font Montserrat + Inter + Caveat; Lucide Icons).

## ✨ Fitur

- **Hero Section** — nama, role, tagline, CTA "Lihat Proyek" & "Hubungi Saya"
- **About** — ringkasan profil Software Engineering Student & Content Creator
- **Skills & Tools** — Programming, Web & Backend, Tools, Video & Multimedia
- **Featured Projects** — data dinamis dari database SQL, dengan **fallback otomatis ke data dummy** jika MySQL belum terkoneksi
- **Horizontal Scroll Section** — section proyek di-*pin* (GSAP ScrollTrigger) di desktop: kartu bergerak horizontal mengikuti scroll vertikal dengan progress bar & hint "scroll to explore"; di mobile/tablet otomatis beralih ke native swipe (`overflow-x` + `scroll-snap`) tanpa scroll-jacking
- **Navigasi kartu proyek** — tombol panah Prev/Next (desktop: memajukan scroll pin satu kartu; mobile: `scrollBy` satu kartu) dengan state dinamis (nonaktif di ujung)
- **Aksi kartu proyek** — tombol **GitHub Repo** & **Live Demo** di tiap kartu
- **Modal Case Study** — tombol "Lihat Detail Proyek" membuka modal berisi Role, Masalah, Solusi, Fitur Utama, & Tech Stack
- **Download CV** — tombol di Hero Section mengunduh `public/cv/Bima-Respati-CV.pdf` (placeholder, silakan ganti dengan CV asli)
- **Pendidikan & Pengalaman** — section timeline berisi SMK Jakarta Pusat 1 (RPL) + pengalaman leadership dengan ukuran tim, workflow Git, dan tanggung jawab teknis
- **Breakdown teknis & metrik proyek** — skill backend diperluas (REST API, Authentication, Vercel Deployment) dan metrik nyata (8+ tabel database, REST endpoints, role) tampil di modal case study
- **Portofolio Video** — kartu video dengan badge role, durasi, peralatan/software, dan lightbox embed player (YouTube) via tombol "Tonton Video"
- **Contact Form** — POST `/contact`, tersimpan ke tabel `messages`
- **Iron Spider Theme** — putih bersih + maroon/navy/gold dengan pola jaring laba-laba halus di hero, tanpa dark mode
- **Flash message** — notifikasi sukses/gagal setelah submit form

## 🛠️ Tech Stack

| Lapisan | Teknologi |
|---|---|
| Backend | Node.js, Express.js |
| Template | EJS |
| Styling | Tailwind CSS (CDN) |
| Icon | Lucide (CDN) |
| Font | Plus Jakarta Sans (Google Fonts) |
| Database | MySQL (`mysql2`) |

## 📁 Struktur Proyek

```
├── app.js                 # Express server, routing & controller
├── db.js                  # Koneksi MySQL (pool) + fallback dummy data
├── schema.sql             # Struktur tabel projects & messages + sample data
├── package.json
├── .env.example           # Template konfigurasi (copy → .env)
├── data/
│   └── projects.js        # Data dummy (fallback saat DB tidak tersedia)
└── views/
    ├── index.ejs          # Halaman utama (hero, about, skills, projects, contact)
    └── partials/
        ├── head.ejs       # <head> — Tailwind CDN, font, icons, pola web-pattern hero
        ├── header.ejs     # Navbar sticky + mobile menu
        └── footer.ejs     # Footer + script (lucide, mobile menu, toast)
```

## 📝 Konten yang perlu diganti sebelum deploy

- **WhatsApp** — nomor sudah diisi (`wa.me/6283871267899`); sesuaikan jika berubah. **YouTube** — link social dihapus karena belum ada channel; tambahkan kembali di `app.js` (objek `socials`) saat channel tersedia
- **`github_url` proyek** — `data/projects.js` & `schema.sql` memakai placeholder (`github.com/bimarespati/webrelawan`, dst.) → ganti dengan repo asli
- **`video_url` proyek video** — masih `null`; isi link YouTube agar tombol "Tonton Video" & lightbox aktif
- **File CV** — ganti isi `public/cv/Bima-Respati-CV.pdf` (saat ini placeholder)
- **Domain OG/canonical** — `siteUrl` di `app.js` sudah diisi `https://porto-mu-taupe.vercel.app` (ubah jika domain final berbeda)
- **Gambar Open Graph** — meta `og:image` memakai `logo.png`; untuk pratinjau media sosial yang optimal, letakkan gambar 1200×630 di `public/images/og-cover.png` lalu ubah nilai `og:image` di `views/partials/head.ejs`

## 🚀 Cara Menjalankan

### 1. Install dependencies

```bash
npm install
```

### 2. Siapkan konfigurasi

```bash
cp .env.example .env
# lalu isi DB_PASSWORD sesuai MySQL kamu
```

### 3. Buat database & tabel (opsional, tapi disarankan)

```bash
npm run db:init          # atau: mysql -u root -p < schema.sql
```

> **Tanpa MySQL?** Tidak masalah. Selama `DB_FALLBACK=true` (default) dan DB tidak
> bisa dijangkau, aplikasi tetap berjalan memakai data dummy di `data/projects.js`.

### 4. Jalankan server

```bash
npm start                # atau: npm run dev (auto-restart)
```

Buka **http://localhost:3000** 🎉

## 📦 Routes

| Method | Path | Deskripsi |
|---|---|---|
| GET | `/` | Halaman portofolio (projects dari DB / dummy) |
| POST | `/contact` | Simpan pesan form kontak ke tabel `messages` |

## 📊 Database

Tabel di `schema.sql`:

- **`projects`** — `title, role, description, tech_stack, project_type (web|video), link_url, is_featured`
- **`messages`** — `name, email, message, is_read, created_at`

Cek pesan masuk:

```sql
USE portofolio_db;
SELECT * FROM messages ORDER BY created_at DESC;
```
