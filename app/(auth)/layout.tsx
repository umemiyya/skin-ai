import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
      <div className="relative hidden w-1/2 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 lg:block">
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
