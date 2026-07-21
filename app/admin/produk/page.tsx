'use client';

import { useMemo, useState } from 'react';
import { Search, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/components/empty-state';
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
import { products } from '@/lib/matching';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Product, SkinCategory } from '@/types';

const CATEGORIES: (SkinCategory | 'Semua')[] = ['Semua', 'Kering', 'Berminyak', 'Berjerawat'];

export default function AdminProdukPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<SkinCategory | 'Semua'>('Semua');
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'Semua' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Katalog Produk</h1>
        <p className="mt-1 text-muted-foreground">
          Daftar produk skincare yang digunakan sebagai dasar rekomendasi ({products.length} produk).
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari nama produk atau brand..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? 'default' : 'outline'}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState icon={Package} title="Produk tidak ditemukan" description="Coba ubah kata kunci pencarian atau filter kategori." className="border-none" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => setSelected(product)}>
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{selected.brand}</Badge>
                  <Badge variant="secondary">{selected.category}</Badge>
                  <Badge variant="outline">{formatCurrency(selected.price)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selected.description}</p>
                <div>
                  <p className="mb-1.5 text-sm font-medium">Ingredients</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.ingredients.map((ing) => (
                      <Badge key={ing} variant="secondary" className="text-xs">
                        {ing}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ditambahkan pada {formatDate(selected.createdAt)}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
