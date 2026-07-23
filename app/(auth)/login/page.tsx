'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, ShieldCheck, User as UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAction } from '@/app/actions/auth';
import { loginSchema, type LoginInput } from '@/validators/auth';
import type { UserRole } from '@/types/auth';

export default function LoginPage() {
  const [submittingRole, setSubmittingRole] = useState<UserRole | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput, role: UserRole) => {
    setSubmittingRole(role);
    try {
      const result = await loginAction({ ...data, role });
      // Jika berhasil, server action akan redirect sehingga baris di bawah tidak tercapai.
      if (result && !result.success) {
        toast.error(result.error || 'Gagal masuk. Silakan coba lagi.');
      }
    } catch (err: any) {
      // Next.js redirect() melempar error khusus (NEXT_REDIRECT) — abaikan itu.
      if (err?.digest?.startsWith?.('NEXT_REDIRECT')) throw err;
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmittingRole(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Masuk ke akun Anda</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Belum punya akun?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="username_anda" autoComplete="username" {...register('username')} />
          {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSubmit((data) => onSubmit(data, 'user'))}
            disabled={submittingRole !== null}
          >
            {submittingRole === 'user' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserIcon className="h-4 w-4" />
            )}
            Masuk sebagai User
          </Button>
          <Button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, 'admin'))}
            disabled={submittingRole !== null}
          >
            {submittingRole === 'admin' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="h-4 w-4" />
            )}
            Masuk sebagai Admin
          </Button>
        </div>
      </form>
    </div>
  );
}