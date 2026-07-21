# SkinDetect — Analisis Jenis Kulit Wajah Berbasis AI

Aplikasi Next.js 15 (App Router) + TypeScript untuk analisis jenis kulit wajah
menggunakan Anthropic Claude Vision, dengan rekomendasi skincare berbasis
pencocokan data statis (tanpa database).

## Fitur

- Autentikasi custom UI (Clerk) — Login, Register, Lupa Kata Sandi, Verifikasi Email
- Landing page (Navbar, Hero, Cara Kerja, Fitur, FAQ, Footer)
- Scan wajah → analisis Claude Vision → validasi "bukan wajah" → hasil analisis
  (radar chart, progress bar, ingredient & produk rekomendasi)
- Riwayat scan disimpan di **Local Storage** (tanpa database)
- Dashboard Admin (read-only): katalog produk & ingredient dari `data/*.json`
- Role-based access: user biasa tidak memiliki menu "Produk"; hanya admin

## Tech Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui (custom, tanpa CLI) ·
Clerk Auth (custom UI, tanpa komponen bawaan) · Anthropic Claude API (Vision) ·
React Hook Form + Zod · Server Actions · Recharts (radar chart) · react-dropzone

## Instalasi

```bash
npm install
cp .env.example .env.local
```

Isi `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx
ANTHROPIC_API_KEY=sk-ant-xxx
```

Jalankan:

```bash
npm run dev
```

## Konfigurasi Role Admin (Clerk)

Karena aplikasi ini tidak menggunakan database, role pengguna (`user` / `admin`)
disimpan di **Clerk `publicMetadata`** dan dibaca lewat session claims.

1. Di **Clerk Dashboard → Sessions → Customize session token**, tambahkan claim:
   ```json
   { "metadata": "{{user.public_metadata}}" }
   ```
2. Untuk menjadikan seorang pengguna sebagai admin, set `publicMetadata` mereka:
   ```json
   { "role": "admin" }
   ```
   Bisa dilakukan lewat Clerk Dashboard → Users → pilih user → Metadata,
   atau lewat Clerk Backend API.
3. `middleware.ts` akan membaca `sessionClaims.metadata.role` untuk memproteksi
   rute `/admin/*`. Pengguna tanpa role `admin` yang mencoba mengakses `/admin`
   akan diarahkan kembali ke `/dashboard`.

## Struktur Data

Data produk & ingredient bersifat statis dan dibaca langsung dari:

```
data/products.json
data/ingredients.json
```

Tidak ada Prisma maupun database — semua data dibaca via `import` langsung
(lihat `lib/matching.ts`).

## Struktur Folder

```
app/
  (auth)/           # login, register, forgot-password, verify-email
  actions/          # server actions (scanFaceAction)
  admin/            # dashboard, produk, ingredient (read-only)
  dashboard/        # dashboard, scan, riwayat, profil
components/
  ui/               # primitif UI ala shadcn (button, card, dialog, dst)
  features/         # sidebar, radar chart, dropzone
lib/                # matching engine, utils
hooks/              # use-scan-history (localStorage)
services/           # claude-vision.ts (integrasi Anthropic API)
types/               # tipe TypeScript bersama
validators/         # skema Zod
data/               # products.json & ingredients.json
```

## Catatan

- Path gambar produk (`image`) pada `data/products.json` mengikuti struktur folder
  asal dan belum tentu tersedia di `public/`. Tambahkan file gambar sesuai path
  tersebut di dalam folder `public/` jika ingin menampilkannya, atau sesuaikan
  path sesuai aset yang Anda miliki.
- Riwayat scan tersimpan di localStorage browser (maks. 50 entri terbaru per
  perangkat), sesuai permintaan agar tidak menggunakan database.
