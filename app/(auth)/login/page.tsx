// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useSignIn } from '@clerk/nextjs';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { toast } from 'sonner';

// import { Loader2, Eye, EyeOff } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { loginSchema, type LoginInput } from '@/validators/auth';

// export default function LoginPage() {
//   const { isLoaded, signIn, setActive } = useSignIn();
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

//   const onSubmit = async (data: LoginInput) => {
//     if (!isLoaded) return;
//     setIsSubmitting(true);
//     try {
//       const result = await signIn.create({
//         identifier: data.email,
//         password: data.password,
//       });

//       if (result.status === 'complete') {
//         await setActive({ session: result.createdSessionId });
//         router.push('/dashboard');
//       } else {
//         toast.info('Verifikasi tambahan diperlukan untuk masuk.');
//       }
//     } catch (err: any) {
//       const message = err?.errors?.[0]?.longMessage || 'Email atau kata sandi salah.';
//       toast.error(message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight">Masuk ke akun Anda</h1>
//         <p className="mt-1 text-sm text-muted-foreground">
//           Belum punya akun?{' '}
//           <Link href="/register" className="font-medium text-primary hover:underline">
//             Daftar sekarang
//           </Link>
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input id="email" type="email" placeholder="nama@email.com" {...register('email')} />
//           {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
//         </div>

//         {/* <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="password">Kata Sandi</Label>
//             <Link href="/forgot-password" className="text-sm text-primary hover:underline">
//               Lupa kata sandi?
//             </Link>
//           </div>
//           <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
//           {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
//         </div> */}

//         <div className="space-y-2">
//   <div className="flex items-center justify-between">
//     <Label htmlFor="password">Kata Sandi</Label>
//     <Link href="/forgot-password" className="text-sm text-primary hover:underline">
//       Lupa kata sandi?
//     </Link>
//   </div>

//   <div className="relative">
//     <Input
//       id="password"
//       type={showPassword ? 'text' : 'password'}
//       placeholder="••••••••"
//       className="pr-10"
//       {...register('password')}
//     />

//     <button
//       type="button"
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//       aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
//     >
//       {showPassword ? (
//         <EyeOff className="h-4 w-4" />
//       ) : (
//         <Eye className="h-4 w-4" />
//       )}
//     </button>
//   </div>

//   {errors.password && (
//     <p className="text-sm text-destructive">
//       {errors.password.message}
//     </p>
//   )}
// </div>

//         {/* Clerk CAPTCHA mount point */}
//         <div id="clerk-captcha" />

//         <Button type="submit" className="w-full" disabled={isSubmitting}>
//           {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
//           Masuk
//         </Button>
//       </form>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSignIn } from '@clerk/nextjs';
import { toast } from 'sonner';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { isLoaded, signIn } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage || 'Gagal masuk dengan Google.';
      toast.error(message);
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

      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          Masuk dengan Google
        </Button>

        {/* Clerk CAPTCHA mount point */}
        <div id="clerk-captcha" />
      </div>
    </div>
  );
}