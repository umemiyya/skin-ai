import { LayoutDashboard, Package, FlaskConical } from 'lucide-react';
import { SidebarNav } from '@/components/features/sidebar-nav';

const items = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Produk', href: '/admin/produk', icon: Package },
  { label: 'Ingredient', href: '/admin/ingredient', icon: FlaskConical },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav title="Admin Panel" items={items} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
