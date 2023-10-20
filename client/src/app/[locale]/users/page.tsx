import AdminUsers from '@/components/adminComponents/AdminUsers';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { useUserRole } from '@/hooks/authHooks/useUserRole';
import { redirect } from 'next/navigation';
import React from 'react';

const Users = async () => {
  await useSigninRequiredServer();
  const role = await useUserRole();

  if (role === 'ADMIN') return <AdminUsers />;

  return redirect('/dashboard');
};

export default Users;
