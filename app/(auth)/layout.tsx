import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        {/* <Link href="/" className="mb-10 flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          SkinAI
        </Link> */}
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
      <div className="relative hidden w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 lg:block">
        <div className="flex h-full flex-col items-center justify-center p-16 text-white">
          <div className="max-w-md space-y-4 text-center">
            <h2 className="text-3xl font-bold">Kenali kulit Anda dengan AI</h2>
            <p className="text-blue-100">
              Unggah foto wajah Anda dan dapatkan analisis kulit serta rekomendasi skincare yang
              dipersonalisasi dalam hitungan detik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
