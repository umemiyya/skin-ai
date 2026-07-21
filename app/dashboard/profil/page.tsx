'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { LogOut, Mail, User as UserIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useScanHistory } from '@/hooks/use-scan-history';

export default function ProfilPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { history } = useScanHistory();

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profil Saya</h1>
        <p className="mt-1 text-muted-foreground">Kelola informasi akun Anda.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          {user?.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.imageUrl} alt="Foto profil" className="h-16 w-16 rounded-full object-cover" />
          )}
          <div>
            <CardTitle>{user?.fullName || 'Pengguna'}</CardTitle>
            <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Nama Lengkap</p>
              <p className="text-sm font-medium">{user?.fullName || '-'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground">Total Scan Dilakukan</p>
            <p className="text-lg font-semibold">{history.length}</p>
          </div>
        </CardContent>
      </Card>

      <Button variant="destructive" onClick={() => signOut({ redirectUrl: '/' })}>
        <LogOut className="h-4 w-4" /> Keluar
      </Button>
    </div>
  );
}
