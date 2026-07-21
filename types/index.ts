export type SkinCategory = 'Kering' | 'Berminyak' | 'Berjerawat';
export type SkinType = 'Normal' | 'Berminyak' | 'Kering' | 'Kombinasi' | 'Sensitif';

export interface Ingredient {
  id: string;
  name: string;
  category: SkinCategory;
  benefits: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: SkinCategory;
  ingredients: string[];
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  createdAt: string;
}

export interface SkinConditions {
  oil: number;
  dryness: number;
  // hydration: number;
  // pores: number;
  acne: number;
  // redness: number;
  // texture: number;
}

export interface ScanAnalysisResult {
  isFace: boolean;
  skinType: SkinType;
  confidence: number;
  conditions: SkinConditions;
  recommendedIngredients: string[];
  message?: string;
}

export interface RecommendedProduct extends Product {
  score: number;
  reasons: string[];
}

export interface ScanHistoryItem {
  id: string;
  createdAt: string;
  imageDataUrl: string;
  result: ScanAnalysisResult;
  recommendations: RecommendedProduct[];
}
