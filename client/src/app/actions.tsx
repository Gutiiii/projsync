'use server';

import ChangePasswordEmail from '@/components/emails/ChangePasswordEmail';
import ProjectInvitationEmail from '@/components/emails/ProjectInvitationEmail';
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
    if (!session?.user.email) throw new Error('No email');

    //TODO Change Sender Email
    const result = await res.json();
    const send = await resend.emails.send({
      from: 'help@samuel-gutmans.ch',
      to: [session?.user.email],
      subject: 'Reset Password',
      react: <ChangePasswordEmail code={result.code} />,
    });
    if (send.error) throw new Error('Sending failed');
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};

export const sendPasswordEmailForgot = async (email: string) => {
  try {
    console.log('CALLED');
    const res = await axios.get(
      BACKEND_URL + '/auth/addpasswordresetcode/' + email,
    );
    //TODO Change Sender Email
    await resend.emails.send({
      from: 'help@samuel-gutmans.ch',
      to: [email],
      subject: 'Reset Password',
      react: <ChangePasswordEmail code={res.data.code} />,
    });
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};

export const sendProjectInvitation = async (
  projectTitle: string,
  email: string,
  projectDescription: string,
  invitationId: any,
) => {
  try {
    //TODO Change Sender Email
    await resend.emails.send({
      from: 'help@samuel-gutmans.ch',
      to: [email],
      subject: 'Project Invitation',
      react: (
        <ProjectInvitationEmail
          invitationId={invitationId}
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

//TODO Add ACtion for new Comment
