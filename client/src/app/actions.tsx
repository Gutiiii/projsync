'use server';

import ChangePasswordEmail from '@/components/emails/ChangePasswordEmail';
import ProjectInvitationEmail from '@/components/emails/ProjectInvitationEmail';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { Resend } from 'resend';
import { authOptions } from './api/auth/[...nextauth]/options';
import CardAssignEmail from '@/components/emails/CardAssignEmail';

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
      from: 'no-reply@projsync.app',
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
    const res = await axios.get(
      BACKEND_URL + '/auth/addpasswordresetcode/' + email,
    );
    //TODO Change Sender Email
    await resend.emails.send({
      from: 'no-reply@projsync.app',
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
      from: 'no-reply@projsync.app',
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

export const sendAssignedCard = async (
  projectId: string,
  projectTitle: string,
  cardTitle: string,
  email: string[],
  cardId: string,
) => {
  try {
    await Promise.all(
      email.map(async (email: string) => {
        await resend.emails.send({
          from: 'no-reply@projsync.app',
          to: [email],
          subject: 'You have been Assigned',
          react: (
            <CardAssignEmail
              projectId={projectId}
              projectTitle={projectTitle}
              cardTitle={cardTitle}
              cardId={cardId}
            />
          ),
        });
      }),
    );

    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
