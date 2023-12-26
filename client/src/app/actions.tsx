'use server';

import ChangePasswordEmail from '@/components/emails/ChangePasswordEmail';
import ProjectInvitationEmail from '@/components/emails/ProjectInvitationEmail';
import { BACKEND_URL } from '@/lib/constants';
import { checkboxGroup } from '@nextui-org/react';
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
    //TODO Change to to email
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
    //TODO Change to to email
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

export const sendProjectInvitation = async (
  projectId: string,
  projectTitle: string,
  email: string,
  projectDescription: string,
  data: any,
) => {
  console.log('HELO: ', data.id);
  try {
    //TODO Change to to email
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['samuel.gutmans@gmail.com'],
      subject: 'Project Invitation',
      react: (
        <ProjectInvitationEmail
          projectId={projectId}
          projectName={projectTitle}
          projectDescription={projectDescription}
        />
      ),
    });
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
