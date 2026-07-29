import { Crosshair, Zap, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const FEATURES = [
  { icon: Crosshair, label: 'Akurat' },
  { icon: Zap, label: 'Cepat' },
  { icon: ShieldCheck, label: 'Aman' },
];

export function SkinClassHero() {
  return (
    <div className="grid rounded-2xl border border-border bg-card px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      {/* Left: copy */}
      <div className="space-y-5">
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl">
          Klasifikasi Jenis Kulit Wajah
          <br />
          untuk Rekomendasi Produk
          <br />
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Sistem ini dirancang untuk mengenali jenis kulit wajah Anda secara
          otomatis dan memberikan rekomendasi produk skincare yang paling
          sesuai, berdasarkan hasil analisis citra wajah.
        </p>
      </div>

      {/* Right: face-scan illustration */}
      <div className="relative mx-auto aspect-square w-full max-w-sm rounded-2xl bg-secondary/40">
          <Image src={'/face.jpg'} alt='hello' width={400} height={400}/>
      </div>
    </div>
  );
}
