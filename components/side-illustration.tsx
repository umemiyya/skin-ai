import Image from 'next/image';
import { Sparkles, Leaf } from 'lucide-react';

/**
 * Ganti `src` di bawah ini dengan path gambar kamu sendiri.
 * Taruh file gambarnya di folder /public, misalnya:
 *   /public/images/skincare-illustration.png
 * lalu src-nya cukup: "/images/skincare-illustration.png"
 */
const ILLUSTRATION_SRC = '/face.jpg';

export function SidebarIllustration() {
  return (
    <div className="flex flex-col gap-4">
      {/* Ilustrasi + dekorasi daun & sparkle */}
      <div className="relative flex items-center justify-center py-2">
        <Leaf className="absolute -left-1 top-2 h-6 w-6 -rotate-12 text-primary/40" />
        <Leaf className="absolute -right-1 bottom-4 h-7 w-7 rotate-45 text-primary/30" />
        <Sparkles className="absolute right-2 top-0 h-4 w-4 text-primary/50" />
        <Sparkles className="absolute left-3 bottom-2 h-3 w-3 text-primary/40" />

        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-secondary">
          <Image
            src={ILLUSTRATION_SRC}
            alt="Ilustrasi perawatan wajah"
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Card Tips Perawatan */}
      <div className="rounded-2xl bg-secondary/60 p-1">
        <p className="text-sm font-semibold text-foreground">Tips Perawatan</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Kenali jenis kulitmu dan gunakan produk yang sesuai untuk hasil terbaik.
        </p>
      </div>
    </div>
  );
}