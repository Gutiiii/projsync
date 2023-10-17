import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import AdminDashboard from '@/components/adminComponents/AdminDashboard';
import UserDashboard from '@/components/userComponents/UserDashboard';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { getServerSession } from 'next-auth';
import React from 'react';

const Dashboard = async () => {
  await useSigninRequiredServer();
  const session = await getServerSession(authOptions);
  if (session?.user.role === 'USER') return <UserDashboard />;

  if (session?.user.role === 'ADMIN') return <AdminDashboard />;
};

export default Dashboard;
