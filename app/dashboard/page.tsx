'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { ScanFace, Gauge, Sparkles, ListChecks, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { useScanHistory } from '@/hooks/use-scan-history';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useUser();
  const { history, isLoaded } = useScanHistory();
  const latest = history[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Halo, {user?.firstName || 'Pengguna'} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Berikut ringkasan aktivitas analisis kulit Anda.
        </p>
      </div>

      {!isLoaded ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <EmptyState
          icon={ScanFace}
          title="Belum ada riwayat scan"
          description="Mulai scan wajah Anda untuk mendapatkan analisis kulit dan rekomendasi skincare."
          action={
            <Button asChild>
              <Link href="/dashboard/scan">
                Scan Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <ScanFace className="h-4 w-4" /> Jumlah Scan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{history.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Sparkles className="h-4 w-4" /> Jenis Kulit Terakhir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{latest.result.skinType}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Gauge className="h-4 w-4" /> Confidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{latest.result.confidence}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  Scan Terakhir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold">{formatDate(latest.createdAt)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" /> Rekomendasi Terakhir
              </CardTitle>
            </CardHeader>
            <CardContent>
              {latest.recommendations.length === 0 ? (
                <p className="text-sm text-muted-foreground">Tidak ada rekomendasi produk.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {latest.recommendations.slice(0, 3).map((p) => (
                    <div key={p.id} className="rounded-lg border border-border p-4">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.brand}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
