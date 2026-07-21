'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Loader2, ScanFace, RotateCcw, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ImageDropzone } from '@/components/features/image-dropzone';
import { SkinRadarChart } from '@/components/features/skin-radar-chart';
import { scanFaceAction } from '@/app/actions/scan';
import { useScanHistory } from '@/hooks/use-scan-history';
import { formatCurrency } from '@/lib/utils';
import type { ScanAnalysisResult, RecommendedProduct } from '@/types';

const CONDITION_LABELS: Record<string, string> = {
  oil: 'Minyak',
  dryness: 'Kekeringan',
  // hydration: 'Hidrasi',
  // pores: 'Pori-pori',
  acne: 'Jerawat',
  // redness: 'Kemerahan',
  // texture: 'Tekstur',
};

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
      const res = await scanFaceAction(formData);

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
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Scan Kulit Wajah</h1>
        <p className="mt-1 text-muted-foreground">
          Unggah foto wajah Anda untuk mendapatkan analisis kulit berbasis AI.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          {!previewUrl ? (
            <ImageDropzone onFileSelected={handleFileSelected} disabled={isAnalyzing} />
          ) : (
            <div className="space-y-4">
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview wajah" className="h-full w-full object-cover" />
              </div>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={reset} disabled={isAnalyzing}>
                  <RotateCcw className="h-4 w-4" /> Ganti Foto
                </Button>
                <Button onClick={handleAnalyze} disabled={isAnalyzing}>
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
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hasil Analisis</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-50 p-6 text-center">
                <p className="text-sm text-muted-foreground">Jenis Kulit</p>
                <Badge className="px-4 py-1.5 text-base">{result.skinType}</Badge>
                <p className="mt-2 text-sm text-muted-foreground">Tingkat Kepercayaan</p>
                <p className="text-3xl font-bold text-primary">{result.confidence}%</p>
              </div>
              <SkinRadarChart conditions={result.conditions} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detail Kondisi Kulit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Object.keys(result.conditions) as (keyof typeof result.conditions)[]).map((key) => (
                <div key={key}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{CONDITION_LABELS[key]}</span>
                    <span className="text-muted-foreground">{result.conditions[key]}%</span>
                  </div>
                  <Progress value={result.conditions[key]} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingredient yang Direkomendasikan</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {result.recommendedIngredients.map((ing) => (
                <Badge key={ing} variant="secondary">
                  {ing}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rekomendasi Produk Skincare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" /> Tidak ditemukan produk yang cocok.
                </div>
              ) : (
                recommendations.slice(0, 6).map((product) => (
                  <div key={product.id} className="rounded-xl border border-border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                      <Badge variant="outline">{formatCurrency(product.price)}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {product.ingredients.map((ing) => (
                        <Badge key={ing} variant="secondary" className="text-xs">
                          {ing}
                        </Badge>
                      ))}
                    </div>
                    {product.reasons.length > 0 && (
                      <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm text-muted-foreground">
                        {product.reasons.map((reason, i) => (
                          <li key={i}>• {reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
