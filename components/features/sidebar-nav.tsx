'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarNavProps {
  title: string;
  items: NavItem[];
}

export function SidebarNav({ title, items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-white">
      <div className="flex items-center gap-2 px-6 py-5">
        <div>
          <p className="text-sm font-bold leading-none">SkinDetect</p>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 border-t border-border px-6 py-4">
        <UserButton afterSignOutUrl="/" />
        <span className="text-sm text-muted-foreground">Akun Saya</span>
      </div>
    </aside>
  );
}
