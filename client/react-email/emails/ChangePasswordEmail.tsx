import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

const ChangePasswordEmail = () => (
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
      <Head />
      <Preview>Reset Password</Preview>
      <Body className="bg-gray-100 justify-center items-center text-center">
        <Head className="flex">
          <Heading className="text-center text-3xl font-extralight ">
            ProjSync
          </Heading>
        </Head>
        <Container className="h-96 w-96 bg-white justify-center items-center mx-auto text-center shadow-lg"></Container>
      </Body>
    </Html>
  </Tailwind>
);

export default ChangePasswordEmail;
