import { SidebarNav } from '@/components/features/sidebar-nav';
import { getSession } from '@/lib/auth-server';
import Image from 'next/image';

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
      <main className="flex-1 overflow-y-auto p-8">{children}

<div className="fixed bottom-4 right-4 z-50 grid grid-cols-2 gap-2 w-40">
  <div className="relative h-20 bg-white/85 rounded-xl">
    <Image
      src="/handayani.png"
      alt="Detail ayam broiler 1"
      fill
      className="object-contain p-1.5"
    />
  </div>
  <div className="relative h-20 bg-white/85 rounded-xl">
    <Image
      src="/logo-h.png"
      alt="Detail ayam broiler 2"
      fill
      className="object-contain p-1.5"
    />
  </div>
</div>
      </main>
    </div>
  );
}