'use client';

import { useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ingredients, getProductsUsingIngredient } from '@/lib/matching';
import { formatCurrency } from '@/lib/utils';
import type { Ingredient } from '@/types';

export default function AdminIngredientPage() {
  const [selected, setSelected] = useState<Ingredient | null>(null);
  const relatedProducts = selected ? getProductsUsingIngredient(selected.name) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Katalog Ingredient</h1>
        <p className="mt-1 text-muted-foreground">
          Daftar ingredient skincare beserta manfaatnya ({ingredients.length} ingredient).
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Ingredient</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Benefit</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ing) => (
                <TableRow key={ing.id}>
                  <TableCell className="font-medium">{ing.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ing.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                    {ing.benefits}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => setSelected(ing)}>
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-primary" /> {selected.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Badge variant="secondary">{selected.category}</Badge>
                <div>
                  <p className="text-sm font-medium">Deskripsi</p>
                  <p className="text-sm text-muted-foreground">{selected.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Manfaat</p>
                  <p className="text-sm text-muted-foreground">{selected.benefits}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Produk yang menggunakan ingredient ini ({relatedProducts.length})
                  </p>
                  <div className="space-y-2">
                    {relatedProducts.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Belum ada produk terkait.</p>
                    ) : (
                      relatedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between rounded-lg border border-border p-3"
                        >
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.brand}</p>
                          </div>
                          <span className="text-sm font-medium">{formatCurrency(p.price)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
