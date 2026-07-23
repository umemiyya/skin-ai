'use server';

import { getSession } from '@/lib/auth-server';
import { analyzeFaceImage } from '@/services/claude-vision';
import { matchProducts } from '@/lib/matching';
import type { ScanAnalysisResult, RecommendedProduct } from '@/types';

interface ScanActionResult {
  success: boolean;
  error?: string;
  result?: ScanAnalysisResult;
  recommendations?: RecommendedProduct[];
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function scanFaceAction(formData: FormData): Promise<ScanActionResult> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Anda harus login untuk menggunakan fitur ini.' };
  }

  const file = formData.get('image') as File | null;
  if (!file) {
    return { success: false, error: 'Tidak ada gambar yang diunggah.' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: 'Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.',
    };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return { success: false, error: 'Ukuran gambar maksimal 5MB.' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mediaType = file.type as 'image/jpeg' | 'image/png' | 'image/webp';

    const result = await analyzeFaceImage(base64, mediaType);

    if (!result.isFace) {
      return {
        success: false,
        error: result.message || 'Gambar yang diunggah bukan foto wajah. Silakan coba lagi.',
      };
    }

    const recommendations = matchProducts(result);

    return { success: true, result, recommendations };
  } catch (err) {
    console.error('scanFaceAction error:', err);
    return {
      success: false,
      error: 'Terjadi kesalahan saat menganalisis gambar. Silakan coba lagi.',
    };
  }
}