import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
    password: z
      .string()
      .min(8, 'Kata sandi minimal 8 karakter')
      .regex(/[A-Z]/, 'Harus mengandung huruf besar')
      .regex(/[0-9]/, 'Harus mengandung angka'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi kata sandi tidak cocok',
    path: ['confirmPassword'],
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    code: z.string().min(6, 'Kode verifikasi tidak valid'),
    password: z
      .string()
      .min(8, 'Kata sandi minimal 8 karakter')
      .regex(/[A-Z]/, 'Harus mengandung huruf besar')
      .regex(/[0-9]/, 'Harus mengandung angka'),
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const verifyEmailSchema = z.object({
  code: z.string().min(6, 'Kode verifikasi minimal 6 digit'),
});
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
