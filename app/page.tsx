import Link from 'next/link';
import {
  Sparkles,
  ScanFace,
  Camera,
  BrainCircuit,
  ListChecks,
  ShieldCheck,
  History,
  Gauge,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: Camera,
    title: '1. Unggah Foto Wajah',
    desc: 'Ambil atau unggah foto wajah Anda dengan pencahayaan yang baik dan jelas.',
  },
  {
    icon: BrainCircuit,
    title: '2. Analisis oleh AI',
    desc: 'Claude Vision AI menganalisis kondisi kulit wajah Anda secara mendalam.',
  },
  {
    icon: Gauge,
    title: '3. Lihat Hasil Analisis',
    desc: 'Dapatkan jenis kulit, tingkat kepercayaan, dan detail kondisi kulit Anda.',
  },
  {
    icon: ListChecks,
    title: '4. Rekomendasi Skincare',
    desc: 'Terima rekomendasi produk skincare yang paling sesuai dengan kondisi kulit Anda.',
  },
];

const features = [
  {
    icon: ScanFace,
    title: 'Deteksi Jenis Kulit Akurat',
    desc: 'Menggunakan AI vision canggih untuk mendeteksi jenis dan kondisi kulit wajah Anda.',
  },
  {
    icon: ListChecks,
    title: 'Rekomendasi Dipersonalisasi',
    desc: 'Produk skincare direkomendasikan berdasarkan kecocokan ingredient dan kondisi kulit.',
  },
  {
    icon: History,
    title: 'Riwayat Scan',
    desc: 'Pantau perkembangan kondisi kulit Anda dari waktu ke waktu.',
  },
  {
    icon: ShieldCheck,
    title: 'Aman & Privasi Terjaga',
    desc: 'Data dan foto Anda diproses secara aman dengan standar keamanan modern.',
  },
];

const faqs = [
  {
    q: 'Apakah aplikasi ini gratis digunakan?',
    a: 'Ya, Anda dapat membuat akun dan melakukan analisis kulit wajah secara gratis.',
  },
  {
    q: 'Apakah foto saya disimpan di server?',
    a: 'Foto hanya digunakan untuk proses analisis. Riwayat scan disimpan secara lokal di perangkat Anda.',
  },
  {
    q: 'Seberapa akurat hasil analisisnya?',
    a: 'Analisis menggunakan model AI vision canggih, namun hasil tetap bersifat sebagai panduan awal dan bukan pengganti konsultasi dermatolog.',
  },
  {
    q: 'Jenis kulit apa saja yang bisa dideteksi?',
    a: 'Aplikasi dapat mendeteksi jenis kulit Normal, Berminyak, Kering, Kombinasi, dan Sensitif.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            SkinDetect
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#cara-kerja" className="hover:text-foreground">Cara Kerja</a>
            <a href="#fitur" className="hover:text-foreground">Fitur</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Masuk</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Mulai Sekarang</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Didukung oleh AI Vision Terkini
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Analisis Jenis Kulit Wajah Menggunakan AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Unggah foto wajah Anda dan dapatkan analisis kulit serta rekomendasi skincare yang sesuai.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">Mulai Sekarang</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#cara-kerja">Pelajari Lebih Lanjut</a>
            </Button>
          </div>

          <div className="mt-16 w-full max-w-3xl">
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-white p-8 shadow-lg">
              <div className="grid w-full grid-cols-3 gap-6 text-center">
                <div>
                  <ScanFace className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">Deteksi Wajah</p>
                </div>
                <div>
                  <BrainCircuit className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">Analisis AI</p>
                </div>
                <div>
                  <ListChecks className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">Rekomendasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section id="cara-kerja" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Cara Kerja</h2>
          <p className="mt-3 text-muted-foreground">Empat langkah mudah menuju kulit yang lebih sehat</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.title} className="border-border/60">
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Fitur Unggulan</h2>
            <p className="mt-3 text-muted-foreground">Semua yang Anda butuhkan untuk memahami kulit Anda</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="bg-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Pertanyaan Umum</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((item) => (
            <details key={item.q} className="group rounded-xl border border-border p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {item.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 px-10 py-16 text-center text-white">
          <h2 className="text-3xl font-bold">Siap mengenal kulit Anda lebih baik?</h2>
          <p className="mt-3 text-blue-100">Daftar gratis dan mulai analisis kulit wajah Anda sekarang.</p>
          <Button size="lg" variant="secondary" className="mt-8" asChild>
            <Link href="/register">Mulai Sekarang</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> SkinDetect
          </div>
          <p>&copy; {new Date().getFullYear()} SkinDetect. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
