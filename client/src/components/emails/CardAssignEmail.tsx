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

const CardAssignEmail = ({
  projectId,
  projectTitle,
  cardTitle,
  cardId,
}: {
  projectId: string;
  projectTitle: string;
  cardTitle: string;
  cardId: string;
}) => (
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
      <Preview>Assigned</Preview>
      <Body className="bg-gray-100">
        <Head className="flex">
          {/* TODO Add Logo */}
          <Heading className="text-center text-3xl font-extralight mt-20">
            ProjSync
          </Heading>
        </Head>
        <Container className="h-96 w-96 bg-white text-center shadow-lg px-8">
          <Heading className="text-2xl "></Heading>
          <Text>Project: {projectTitle}</Text>
          <Text>You have been Assigned to following Task: {cardTitle}</Text>
          <Link
            className="cursor-pointer bg-blue-500 rounded-sm px-3 py-2 text-white mt-6"
            href={`${FRONTEND_URL}/projects/${projectId}/board?defaultOpen=${cardId}`}
          >
            Open Task
          </Link>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default CardAssignEmail;
