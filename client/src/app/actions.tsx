'use server';

import ChangePasswordEmail from '@/components/emails/ChangePasswordEmail';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { Resend } from 'resend';
import { authOptions } from './api/auth/[...nextauth]/options';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordEmail = async () => {
  const session = await getServerSession(authOptions);
  try {
    const res = await fetch(
      BACKEND_URL + '/auth/addpasswordresetcode/' + session?.user.email,
    );
    const result = await res.json();
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

export const sendPasswordEmailForgot = async (email: string) => {
  try {
    const res = await axios.get(
      BACKEND_URL + '/auth/addpasswordresetcode/' + email,
    );
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['samuel.gutmans@gmail.com'],
      subject: 'Reset Password',
      react: <ChangePasswordEmail code={res.data.code} />,
    });

    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
