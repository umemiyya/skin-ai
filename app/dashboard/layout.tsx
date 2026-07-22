'use client';

import { LayoutDashboard, ScanFace, History, UserCircle } from 'lucide-react';
import { SidebarNav } from '@/components/features/sidebar-nav';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

const items = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Scan Kulit', href: '/dashboard/scan', icon: ScanFace },
  { label: 'Riwayat Scan', href: '/dashboard/riwayat', icon: History },
  { label: 'Profil', href: '/dashboard/profil', icon: UserCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const ADMIN_EMAILS = [
  'nanashieth@gmail.com',
  'umemiya.hl@gmail.com',
  'sitinurhalisa850@gmail.com'
];

useEffect(() => {
  if (!isLoaded) return;

  const email = user?.emailAddresses?.[0]?.emailAddress;

    console.log(email)
  if (email && ADMIN_EMAILS.includes(email)) {
    router.push('/admin');
  }
}, [isLoaded, user, router]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav title="Dashboard Pengguna" items={items} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
