'use client';

import { LayoutDashboard, ScanFace, History, UserCircle } from 'lucide-react';
import { SidebarNav } from '@/components/features/sidebar-nav';

const items = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Scan Kulit', href: '/dashboard/scan', icon: ScanFace },
  { label: 'Riwayat Scan', href: '/dashboard/riwayat', icon: History },
  { label: 'Profil', href: '/dashboard/profil', icon: UserCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav title="Dashboard Pengguna" items={items} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
