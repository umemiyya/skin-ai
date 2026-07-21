'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Loader2, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema, type RegisterInput, verifyEmailSchema, type VerifyEmailInput } from '@/validators/auth';

export default function RegisterPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors },
  } = useForm<VerifyEmailInput>({ resolver: zodResolver(verifyEmailSchema) });

  const onSubmit = async (data: RegisterInput) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
      toast.success('Kode verifikasi telah dikirim ke email Anda.');
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage || 'Gagal membuat akun. Silakan coba lagi.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onVerify = async (data: VerifyEmailInput) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: data.code });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Akun berhasil dibuat!');
        router.push('/dashboard');
      } else {
        toast.error('Kode verifikasi tidak valid.');
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage || 'Kode verifikasi tidak valid.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pendingVerification) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Verifikasi Email</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Masukkan kode 6 digit yang telah dikirim ke email Anda.
          </p>
        </div>
        <form onSubmit={handleSubmitCode(onVerify)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Kode Verifikasi</Label>
            <Input id="code" placeholder="123456" {...registerCode('code')} />
            {codeErrors.code && <p className="text-sm text-destructive">{codeErrors.code.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Verifikasi
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Buat akun baru</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input id="name" placeholder="Nama Anda" {...register('name')} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" {...register('email')} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div> */}
        <div className="space-y-2">
  <Label htmlFor="password">Kata Sandi</Label>

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
      onClick={() => setShowPassword((prev) => !prev)}
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

        {/* <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
          <Input id="confirmPassword" type="password" placeholder="••••••••" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div> */}
        <div className="space-y-2">
  <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>

  <div className="relative">
    <Input
      id="confirmPassword"
      type={showConfirmPassword ? 'text' : 'password'}
      placeholder="••••••••"
      className="pr-10"
      {...register('confirmPassword')}
    />

    <button
      type="button"
      onClick={() => setShowConfirmPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      aria-label={
        showConfirmPassword
          ? 'Sembunyikan kata sandi'
          : 'Lihat kata sandi'
      }
    >
      {showConfirmPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="text-sm text-destructive">
      {errors.confirmPassword.message}
    </p>
  )}
</div>

        <div id="clerk-captcha" />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Daftar
        </Button>
      </form>
    </div>
  );
}
