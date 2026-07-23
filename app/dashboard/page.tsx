import { getSession } from '@/lib/auth-server';
import { DashboardClient } from '@/components/features/dashboard-client';

export default async function DashboardPage() {
  const session = await getSession();
  return <DashboardClient username={session?.username || 'Pengguna'} />;
}