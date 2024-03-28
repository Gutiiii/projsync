'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Divider } from 'antd';
import { useSession } from 'next-auth/react';
import { useGetMessages } from '@/hooks/projectHooks/useGetMessages';
import { Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from '@/lib/constants';
import useSocket from '@/hooks/authHooks/useSocket';

interface ChatContainerProps {
  projectId: string;
  sessionToken: string;
}

export interface Chat {
  id: string;
  content: string;
  projectId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: string;
  role: string;
  userId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
}

const ChatContainer: FC<ChatContainerProps> = ({ projectId, sessionToken }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null); // Specify type for ref
  const socket = useSocket();
  const { data: session } = useSession();
  const { data, isLoading } = useGetMessages(sessionToken, projectId);
  const queryClient = useQueryClient();

  const chats: Chat[] = data;

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages from the server
      socket.on('onMessage', async (data: any) => {
        await queryClient.cancelQueries(['getMessages']);

        const prevList: Chat[] =
          queryClient.getQueryData(['getMessages']) || [];

        queryClient.setQueryData(['getMessages'], [...prevList, data.object]);

        // Scroll to the bottom
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      });
    }
  }, [socket]);

  return (
    <div className="shadow-xl rounded-sm border-1 h-[600px] relative">
      <div className="text-center bg-primary rounded-sm">
        <p className="text-xl font-bold text-white">ProjSync Chat</p>
      </div>
      {!isLoading && (
        <div className="max-h-[500px] overflow-y-auto" ref={chatContainerRef}>
          {chats.map((chat) => {
            return (
              <ChatMessage
                key={chat.id}
                isCurrentSender={chat.user.user.id === session?.user.id}
                message={chat.content}
                userName={chat.user.user.name}
              />
            );
          })}
        </div>
      )}

      {/* <Divider className="" /> */}
      <div className="absolute bottom-0 w-full h-12">
        <ChatInput socket={socket} projectId={projectId} />
      </div>
    </div>
  );
};

export default ChatContainer;
