# 🚀 Portofolio Personal — Bima Respati

Web Portofolio Personal berbasis **Node.js + Express + EJS + MySQL**, dengan tampilan **Premium Iron Spider / Spider-Verse** (Tailwind CSS via CDN, palet putih bersih dengan aksen maroon `red-900`, navy `slate-950`, dan gold `amber-500/600`; font Montserrat + Inter + Caveat; Lucide Icons).

## ✨ Fitur

- **Hero Section** — nama, role, tagline, CTA "Lihat Proyek" & "Hubungi Saya"
- **About** — ringkasan profil Software Engineering Student & Content Creator
- **Skills & Tools** — Programming, Web & Backend, Tools, Video & Multimedia
- **Featured Projects** — data dinamis dari database SQL, dengan **fallback otomatis ke data dummy** jika MySQL belum terkoneksi
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
