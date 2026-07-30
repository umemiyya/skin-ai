'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  ScanFace,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageDropzone } from '@/components/features/image-dropzone';
import { useScanHistory } from '@/hooks/use-scan-history';
import type { ScanAnalysisResult, RecommendedProduct } from '@/types';

const CONDITION_LABELS: Record<string, string> = {
  oil: 'Tidak terlalu berminyak',
  dryness: 'Tidak terlalu kering',
  acne: 'Berjerawat',
};

const TILE_COLORS = [
  'bg-emerald-50 text-emerald-700',
  'bg-sky-50 text-sky-700',
  'bg-rose-50 text-rose-700',
  'bg-amber-50 text-amber-700',
];

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanAnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const { addScan } = useScanHistory();

  const handleFileSelected = (selected: File) => {
    setFile(selected);
    setResult(null);
    setRecommendations([]);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(selected);
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setRecommendations([]);
  };

  const handleAnalyze = async () => {
    if (!file || !previewUrl) return;
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        `https://skin-be-hazel.vercel.app/api/scan`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const res = await response.json();

      if (!res.success || !res.result) {
        toast.error(res.error || 'Gambar tidak dapat dianalisis.');
        return;
      }

      setResult(res.result);
      setRecommendations(res.recommendations || []);
      addScan({
        imageDataUrl: previewUrl,
        result: res.result,
        recommendations: res.recommendations || [],
      });
      toast.success('Analisis kulit berhasil!');
    } catch {
      toast.error('Terjadi kesalahan saat menganalisis gambar.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Klasifikasi Jenis Kulit Wajah
        </h1>
        <p className="mt-1 text-muted-foreground">
          Unggah foto wajah Anda untuk mengetahui jenis kulit secara otomatis
          menggunakan teknologi Deep Learning (CNN).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload card */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">1. Unggah Foto Wajah</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!previewUrl ? (
              <ImageDropzone onFileSelected={handleFileSelected} disabled={isAnalyzing} />
            ) : (
              <>
                <p className="text-sm font-medium text-muted-foreground">Preview Gambar</p>
                <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Preview wajah"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    className="flex-1 border-primary/30 text-primary hover:bg-secondary hover:text-primary"
                    onClick={reset}
                    disabled={isAnalyzing}
                  >
                    <RotateCcw className="h-4 w-4" /> Ganti Gambar
                  </Button>
                  {!result && (
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Menganalisis...
                        </>
                      ) : (
                        <>
                          <ScanFace className="h-4 w-4" /> Analisis
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Result card */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">2. Hasil Klasifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl bg-secondary/50 p-6 text-center text-sm text-muted-foreground">
                <Sparkles className="h-6 w-6 text-primary" />
                Unggah dan analisis foto untuk melihat hasil klasifikasi di sini.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <ScanFace className="h-9 w-9 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jenis Kulit Anda</p>
                    <p className="text-3xl font-bold text-primary">{result.skinType}</p>
                    <Badge className="mt-2 gap-1 rounded-full bg-primary px-3 py-1 text-primary-foreground hover:bg-primary/90">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Tingkat Keyakinan: {result.confidence}%
                    </Badge>
                  </div>
                </div>

                <div className="border-t hidden border-border pt-4">
                  <p className="mb-3 text-sm font-semibold">
                    Ciri-ciri Kulit {result.skinType}
                  </p>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    {(Object.keys(result.conditions) as (keyof typeof result.conditions)[]).map(
                      (key) => (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          <span>{CONDITION_LABELS[key] ?? key}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {result.recommendedIngredients?.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <p className="mb-2 text-sm font-semibold">Ingredient yang Direkomendasikan</p>
                    <div className="flex flex-wrap gap-2">
                      {result.recommendedIngredients.map((ing) => (
                        <Badge key={ing} variant="secondary" className="rounded-full">
                          {ing}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Rekomendasi Produk Skincare</CardTitle>
          </CardHeader>
          <CardContent>
            {recommendations.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4" /> Tidak ditemukan produk yang cocok.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {recommendations.slice(0, 8).map((product, i) => (
                  <div
                    key={product.id}
                    className="flex flex-col overflow-hidden rounded-xl border border-border"
                  >
                    <div
                      className={`flex h-28 hidden items-center justify-center ${TILE_COLORS[i % TILE_COLORS.length]}`}
                    >
                      <ScanFace className="h-8 w-8 opacity-60" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        {product.brand}
                      </p>
                      <p className="text-sm font-semibold leading-snug">{product.name}</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {product.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 hidden w-full border-primary/30 text-primary hover:bg-secondary hover:text-primary"
                      >
                        Lihat Produk
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <p className="flex items-center gap-2 rounded-xl bg-secondary/60 p-4 text-xs text-muted-foreground">
        <AlertTriangle className="h-4 w-4 shrink-0 text-primary" />
        Hasil klasifikasi ini hanya bersifat referensi. Untuk kondisi kulit tertentu, disarankan
        berkonsultasi dengan dermatolog.
      </p>
    </div>
  );
}