import productsData from '@/data/products.json';
import ingredientsData from '@/data/ingredients.json';
import type {
  Product,
  Ingredient,
  ScanAnalysisResult,
  RecommendedProduct,
  SkinType,
  SkinCategory,
} from '@/types';

export const products = productsData as unknown as Product[];
export const ingredients = ingredientsData as unknown as Ingredient[];


function mapSkinTypeToCategories(
  skinType: SkinType,
  conditions: ScanAnalysisResult['conditions']
): SkinCategory[] {
  const categories: SkinCategory[] = [];

  if (skinType === 'Kering') categories.push('Kering');
  if (skinType === 'Berminyak') categories.push('Berminyak');
  if (skinType === 'Berjerawat') categories.push('Berjerawat');

  if (conditions.acne >= 40 && !categories.includes('Berjerawat')) {
    categories.push('Berjerawat');
  }

  return Array.from(new Set(categories));
}

export function matchProducts(result: ScanAnalysisResult): RecommendedProduct[] {
  const relevantCategories = mapSkinTypeToCategories(result.skinType, result.conditions);
  const recommendedIngredientsLower = result.recommendedIngredients.map((i) =>
    i.toLowerCase()
  );

  const scored: RecommendedProduct[] = products
    .filter((p) => p.isActive)
    .map((product) => {
      let score = 0;
      const reasons: string[] = [];

      if (relevantCategories.includes(product.category)) {
        score += 40;
        reasons.push(`Sesuai untuk kulit ${product.category.toLowerCase()}`);
      }

      const matchedIngredients = product.ingredients.filter((ing) =>
        recommendedIngredientsLower.includes(ing.toLowerCase())
      );
      if (matchedIngredients.length > 0) {
        score += Math.min(matchedIngredients.length * 15, 45);
        reasons.push(
          `Mengandung ${matchedIngredients.join(', ')} yang direkomendasikan untuk kondisi kulit Anda`
        );
      }

      if (result.conditions.acne >= 50 && product.category === 'Berjerawat') {
        score += 15;
        reasons.push('Membantu mengatasi tingkat jerawat yang cukup tinggi');
      }
      if (result.conditions.oil >= 50 && product.category === 'Berminyak') {
        score += 10;
        reasons.push('Membantu mengontrol produksi minyak berlebih');
      }
      if (result.conditions.dryness >= 50 && product.category === 'Kering') {
        score += 10;
        reasons.push('Membantu mengatasi kulit kering');
      }

      return { ...product, score, reasons };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored;
}

export function getIngredientByName(name: string): Ingredient | undefined {
  return ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase());
}

export function getProductsUsingIngredient(ingredientName: string): Product[] {
  return products.filter((p) =>
    p.ingredients.some((i) => i.toLowerCase() === ingredientName.toLowerCase())
  );
}
