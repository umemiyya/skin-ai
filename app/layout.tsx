import type { Metadata } from 'next';
import { Toaster } from 'sonner';
// @ts-ignore
import './globals.css';

export const metadata: Metadata = {
  title: 'Analisis Kulit AI',
  description: 'Analisis jenis kulit wajah menggunakan AI dan dapatkan rekomendasi skincare yang tepat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased font-sans">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}