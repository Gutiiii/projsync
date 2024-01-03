import AdminDashboard from '@/components/adminComponents/AdminDashboard';
import UserDashboard from '@/components/userComponents/UserDashboard';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { useUserRole } from '@/hooks/authHooks/useUserRole';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Dashboard · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};

const Dashboard = async () => {
  await useSigninRequiredServer();
  const role = await useUserRole();

  if (role === 'USER') return <UserDashboard />;

  if (role === 'ADMIN') return <AdminDashboard />;
};

export default Dashboard;
