import { SidebarNav } from '@/components/features/sidebar-nav';
import { getSession } from '@/lib/auth-server';

const items = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Produk', href: '/admin/produk' },
  { label: 'Ingredient', href: '/admin/ingredient' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav title="Admin Panel" items={items} username={session?.username} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}