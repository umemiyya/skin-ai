import { Package, FlaskConical, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products, ingredients } from '@/lib/matching';

export default function AdminDashboardPage() {
  const totalProduk = products.length;
  const totalIngredient = ingredients.length;
  const totalKategori = new Set(products.map((p) => p.category)).size;

  const cards = [
    { label: 'Total Produk', value: totalProduk, icon: Package },
    { label: 'Total Ingredient', value: totalIngredient, icon: FlaskConical },
    { label: 'Total Kategori', value: totalKategori, icon: Layers },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>
        <p className="mt-1 text-muted-foreground">Ringkasan katalog produk dan ingredient skincare.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <card.icon className="h-4 w-4" /> {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
