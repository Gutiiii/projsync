'use server';

import ChangePasswordEmail from '@/components/emails/ChangePasswordEmail';
import { BACKEND_URL } from '@/lib/constants';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { authOptions } from './api/auth/[...nextauth]/options';
// import { ChangePasswordEmail } from '../../react-email/emails/ChangePasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordEmail = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    BACKEND_URL + '/auth/addpasswordresetcode/' + session?.user.id,
  );
  const result = await res.json();
  console.log('RES ', result);

  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['samuel.gutmans@gmail.com'],
      subject: 'Reset Password',
      react: <ChangePasswordEmail code={result.code} />,
    });

    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
