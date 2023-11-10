'use server';

import ChangePasswordEmail from '@/components/emails/ChangePasswordEmail';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
// import { ChangePasswordEmail } from '../../react-email/emails/ChangePasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordEmail = async () => {
  console.log('SEND');
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['samuel.gutmans@gmail.com'],
      subject: 'Reset Password',
      react: <ChangePasswordEmail />,
    });

    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
