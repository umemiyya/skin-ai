'use client';

import { useState } from 'react';
import Link from 'next/link';
import { History, Trash2, ArrowRight, ScanFace } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useScanHistory } from '@/hooks/use-scan-history';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { ScanHistoryItem } from '@/types';

export default function RiwayatPage() {
  const { history, isLoaded, clearHistory, removeScan } = useScanHistory();
  const [selected, setSelected] = useState<ScanHistoryItem | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Riwayat Scan</h1>
          <p className="mt-1 text-muted-foreground">Daftar riwayat analisis kulit Anda, tersimpan di perangkat ini.</p>
        </div>
        {history.length > 0 && (
          <Button variant="outline" onClick={clearHistory}>
            <Trash2 className="h-4 w-4" /> Hapus Semua
          </Button>
        )}
      </div>

      {!isLoaded ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <EmptyState
          icon={History}
          title="Belum ada riwayat"
          description="Riwayat scan kulit Anda akan muncul di sini setelah Anda melakukan analisis."
          action={
            <Button asChild>
              <Link href="/dashboard/scan">
                Scan Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {history.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageDataUrl} alt="Hasil scan" className="h-40 w-full object-cover" />
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <Badge>{item.result.skinType}</Badge>
                  <span className="text-xs text-muted-foreground">{item.result.confidence}%</span>
                </div>
                <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelected(item)}>
                    Lihat Detail
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => removeScan(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ScanFace className="h-5 w-5 text-primary" /> Detail Scan — {formatDate(selected.createdAt)}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selected.imageDataUrl} alt="Hasil scan" className="w-full rounded-lg object-cover" />
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Jenis Kulit</p>
                    <Badge className="mt-1">{selected.result.skinType}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-lg font-semibold">{selected.result.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ingredient Direkomendasikan</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {selected.result.recommendedIngredients.map((ing) => (
                        <Badge key={ing} variant="secondary" className="text-xs">
                          {ing}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Produk Direkomendasikan</p>
                <div className="space-y-2">
                  {selected.recommendations.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(p.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
