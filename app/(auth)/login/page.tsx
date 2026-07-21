'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Loader2, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginInput } from '@/validators/auth';

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        toast.info('Verifikasi tambahan diperlukan untuk masuk.');
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage || 'Email atau kata sandi salah.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" {...register('email')} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        {/* <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Kata Sandi</Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Lupa kata sandi?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div> */}

        <div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label htmlFor="password">Kata Sandi</Label>
    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
      Lupa kata sandi?
    </Link>
  </div>

  <div className="relative">
    <Input
      id="password"
      type={showPassword ? 'text' : 'password'}
      placeholder="••••••••"
      className="pr-10"
      {...register('password')}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>

  {errors.password && (
    <p className="text-sm text-destructive">
      {errors.password.message}
    </p>
  )}
</div>

        {/* Clerk CAPTCHA mount point */}
        <div id="clerk-captcha" />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Masuk
        </Button>
      </form>
    </div>
  );
}
