import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-server';
import { ProfilClient } from '@/components/features/profil-client';

export default async function ProfilPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  return <ProfilClient username={session.username} role={session.role} createdAt={session.createdAt} />;
}