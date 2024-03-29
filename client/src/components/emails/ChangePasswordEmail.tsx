import { FRONTEND_URL } from '@/lib/constants';
import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

const ChangePasswordEmail = ({ code }: { code: string }) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: '#007291',
          },
        },
      },
    }}
  >
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Reset Password</Preview>
      <Body className="bg-gray-100">
        <Head className="flex">
          {/* TODO Add Logo */}
          <Heading className="text-center text-3xl font-extralight mt-20">
            ProjSync
          </Heading>
        </Head>
        <Container className="h-96 w-96 bg-white text-center shadow-lg px-8">
          <Heading className="text-2xl">Password Reset</Heading>
          <Text>
            If you&apos;ve lost your password or wish to reset it, use the link
            below to get started.
          </Text>
          <Link
            className="cursor-pointer bg-blue-500 rounded-sm px-3 py-2 text-white mt-6"
            href={`${FRONTEND_URL}/changepassword/${code}`}
          >
            Reset Your Password
          </Link>
          <Text className="text-gray-500 mt-8">
            If you did not request a password reset, you can safely ignore this
            email. Only a person with access to your email can reset your
            account password.
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default ChangePasswordEmail;
