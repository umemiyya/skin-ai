'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordSchema, type ForgotPasswordInput, resetPasswordSchema, type ResetPasswordInput } from '@/validators/auth';

export default function ForgotPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'request' | 'reset'>('request');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) });

  const onRequestReset = async (data: ForgotPasswordInput) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: data.email,
      });
      setStep('reset');
      toast.success('Kode reset kata sandi telah dikirim ke email Anda.');
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage || 'Gagal mengirim kode. Periksa kembali email Anda.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetPassword = async (data: ResetPasswordInput) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: data.code,
        password: data.password,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Kata sandi berhasil diubah!');
        router.push('/dashboard');
      } else {
        toast.error('Terjadi kesalahan, silakan coba lagi.');
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage || 'Kode tidak valid atau kadaluarsa.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/login" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Kembali ke halaman masuk
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Lupa Kata Sandi</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {step === 'request'
            ? 'Masukkan email Anda untuk menerima kode reset kata sandi.'
            : 'Masukkan kode yang dikirim ke email Anda beserta kata sandi baru.'}
        </p>
      </div>

      {step === 'request' ? (
        <form onSubmit={handleSubmit(onRequestReset)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="nama@email.com" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Kirim Kode Reset
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmitReset(onResetPassword)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Kode Verifikasi</Label>
            <Input id="code" placeholder="123456" {...registerReset('code')} />
            {resetErrors.code && <p className="text-sm text-destructive">{resetErrors.code.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi Baru</Label>
            <Input id="password" type="password" placeholder="••••••••" {...registerReset('password')} />
            {resetErrors.password && <p className="text-sm text-destructive">{resetErrors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Ubah Kata Sandi
          </Button>
        </form>
      )}
    </div>
  );
}
