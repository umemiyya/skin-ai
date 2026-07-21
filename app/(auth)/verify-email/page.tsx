'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, MailCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verifyEmailSchema, type VerifyEmailInput } from '@/validators/auth';

/**
 * Halaman ini digunakan ketika pengguna perlu memverifikasi ulang email
 * (misalnya kembali dari email atau membuka tautan verifikasi secara langsung).
 */
export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailInput>({ resolver: zodResolver(verifyEmailSchema) });

  const onSubmit = async (data: VerifyEmailInput) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: data.code });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Email berhasil diverifikasi!');
        router.push('/dashboard');
      } else {
        toast.error('Kode verifikasi tidak valid.');
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage || 'Kode verifikasi tidak valid atau kadaluarsa.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) return;
    setIsResending(true);
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      toast.success('Kode verifikasi baru telah dikirim.');
    } catch {
      toast.error('Gagal mengirim ulang kode. Silakan mulai proses pendaftaran kembali.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <MailCheck className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Verifikasi Email Anda</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Masukkan kode 6 digit yang telah kami kirimkan ke email Anda untuk mengaktifkan akun.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Kode Verifikasi</Label>
          <Input id="code" placeholder="123456" {...register('code')} />
          {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Verifikasi
        </Button>
        <Button type="button" variant="ghost" className="w-full" onClick={resendCode} disabled={isResending}>
          {isResending && <Loader2 className="h-4 w-4 animate-spin" />}
          Kirim Ulang Kode
        </Button>
      </form>
    </div>
  );
}
