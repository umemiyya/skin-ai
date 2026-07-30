# Project Installation Guide

Panduan ini menjelaskan cara menjalankan project Next.js mulai dari menginstal software yang dibutuhkan hingga aplikasi berhasil dijalankan.

---

# Prasyarat

Pastikan software berikut sudah terinstal pada komputer Anda.

## 1. Install Node.js

Download Node.js versi **LTS** dari:

https://nodejs.org/

Disarankan menggunakan:

- Node.js 22 LTS atau lebih baru

Setelah selesai instalasi, pastikan berhasil dengan menjalankan:

```bash
node -v
```

Contoh output:

```text
v22.18.0
```

Kemudian cek npm:

```bash
npm -v
```

---

## 2. Install Git (Opsional)

Git hanya diperlukan apabila ingin melakukan clone repository atau menggunakan version control.

Download:

https://git-scm.com/downloads

Cek instalasi:

```bash
git --version
```

---

## 3. Install Visual Studio Code (Disarankan)

Download:

https://code.visualstudio.com/

---

## 4. Install pnpm

Project ini menggunakan **pnpm** sebagai package manager.

Install dengan:

```bash
npm install -g pnpm
```

Pastikan berhasil:

```bash
pnpm -v
```

---

# Menjalankan Project

## 1. Extract File Project

Misalnya file yang diterima:

```
project-name.zip
```

Ekstrak menjadi:

```
project-name/
```

---

## 2. Buka Folder Project

Buka menggunakan Visual Studio Code.

Atau melalui terminal:

```bash
cd project-name
```

---

## 3. Install Dependency

Jalankan:

```bash
pnpm install
```

Tunggu hingga seluruh package selesai diunduh.

---

## 4. Jalankan Development Server

```bash
pnpm dev
```

Apabila berhasil akan muncul tampilan seperti berikut:

```text
▲ Next.js

- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in xxxx ms
```

---

## 5. Membuka Aplikasi

Buka browser kemudian akses:

```
http://localhost:3000
```

---

# Build Production

Untuk membuat build production:

```bash
pnpm build
```

---

# Menjalankan Hasil Build

Setelah build selesai:

```bash
pnpm start
```

---

# Menjalankan Linter

```bash
pnpm lint
```

---

# Struktur Folder

Contoh struktur project:

```
project-name/
│
├── app/
├── components/
├── lib/
├── public/
├── styles/
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

# Mengatasi Permasalahan

## Gagal install dependency

Hapus folder berikut:

```
node_modules
```

dan file:

```
pnpm-lock.yaml
```

Kemudian install ulang:

```bash
pnpm install
```

---

## Port 3000 sedang digunakan

Jalankan:

```bash
pnpm dev -- --port 3001
```

Kemudian buka:

```
http://localhost:3001
```

---

## pnpm tidak dikenali

Jika muncul pesan:

```text
pnpm is not recognized...
```

Install kembali:

```bash
npm install -g pnpm
```

Kemudian tutup dan buka kembali terminal.

---

## Node.js belum terinstall

Jika muncul:

```text
node is not recognized...
```

Silakan install Node.js dari:

https://nodejs.org/

Kemudian restart terminal.

---

# Persyaratan Sistem

| Software | Versi Disarankan |
|----------|------------------|
| Node.js | 22 LTS atau lebih baru |
| pnpm | Terbaru |
| Git | Terbaru (Opsional) |
| Visual Studio Code | Terbaru |

---

# Daftar Perintah

| Perintah | Fungsi |
|----------|--------|
| `pnpm install` | Menginstall dependency |
| `pnpm dev` | Menjalankan development server |
| `pnpm build` | Build production |
| `pnpm start` | Menjalankan hasil build |
| `pnpm lint` | Menjalankan linter |

---

# Selesai

Apabila seluruh langkah di atas berhasil dilakukan, aplikasi dapat diakses melalui:

```
http://localhost:3000
```

Selamat menggunakan aplikasi.