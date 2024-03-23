import AdminUsers from '@/components/adminComponents/AdminUsers';
import AdminNavbar from '@/components/navbar/admin/AdminNavbar';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { useUserRole } from '@/hooks/authHooks/useUserRole';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Admin · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};
const Users = async () => {
  await useSigninRequiredServer();
  const role = await useUserRole();

  if (role === 'ADMIN') return <AdminNavbar />;

  return redirect('/dashboard');
};

export default Users;
