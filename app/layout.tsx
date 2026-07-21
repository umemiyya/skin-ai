import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Analisis Kulit AI',
  description: 'Analisis jenis kulit wajah menggunakan AI dan dapatkan rekomendasi skincare yang tepat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/login"
      signUpUrl="/register"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <html lang="id">
        <body className="min-h-screen antialiased font-sans">
          {children}
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
