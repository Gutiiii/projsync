import AdminDashboard from '@/components/adminComponents/AdminDashboard';
import UserDashboard from '@/components/userComponents/UserDashboard';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { useUserRole } from '@/hooks/authHooks/useUserRole';
import React from 'react';

const Dashboard = async () => {
  await useSigninRequiredServer();
  const role = await useUserRole();

  if (role === 'USER') return <UserDashboard />;

  if (role === 'ADMIN') return <AdminDashboard />;
};

export default Dashboard;
