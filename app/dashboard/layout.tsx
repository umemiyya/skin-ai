import { SidebarNav } from '@/components/features/sidebar-nav';
import { getSession } from '@/lib/auth-server';

const items = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Scan Kulit', href: '/dashboard/scan' },
  { label: 'Riwayat Scan', href: '/dashboard/riwayat'},
  { label: 'Profil', href: '/dashboard/profil' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav title="Dashboard Pengguna" items={items} username={session?.username} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}