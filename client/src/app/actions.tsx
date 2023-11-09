'use server';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
// import { ChangePasswordEmail } from '../../react-email/emails/ChangePasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordEmail = async () => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['samuel.gutmans@gmail.com'],
      subject: 'Change Password',
      react: <div>HELLO</div>,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
