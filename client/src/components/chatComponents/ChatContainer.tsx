'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Divider } from 'antd';
import { useSession } from 'next-auth/react';
import { io } from 'socket.io-client';
import { useGetMessages } from '@/hooks/projectHooks/useGetMessages';
import { Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { BACKEND_URL } from '@/lib/constants';

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
  const chatContainerRef = useRef(null);
  const [socket, setSocket] = useState<any>(null);
  const { data: session, status } = useSession();
  const { data, isLoading, refetch } = useGetMessages(sessionToken, projectId);
  const queryClient = useQueryClient();

  const chats: Chat[] = data;

  useEffect(() => {
    console.log('CONNECT');
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages from the server
      socket.on('onMessage', async (data: any) => {
        await queryClient.cancelQueries(['getMessages']);

        const prevList: Chat[] =
          queryClient.getQueryData(['getMessages']) || [];

        queryClient.setQueryData(['getMessages'], [...prevList, data.object]);

        return { prevList };
      });
    }
  }, [socket]);
  return (
    <div className="shadow-xl rounded-sm  border-1 h-[600px] relative">
      <div className="text-center bg-primary rounded-sm">
        <p className="text-xl font-bold  text-white">ProjSync Chat</p>
      </div>
      {!isLoading && (
        <div className="max-h-[500px] overflow-y-auto" ref={chatContainerRef}>
          {chats.map((chat) => {
            return (
              <ChatMessage
                key={chat.id}
                isCurrentSender={chat.user.user.id === session?.user.id}
                message={chat.content}
                socket={socket}
                projectId={projectId}
              />
            );
          })}
        </div>
      )}

      {/* <Divider className="" /> */}
      <div className="absolute bottom-0 w-full h-12 ">
        <ChatInput socket={socket} projectId={projectId} />
      </div>
    </div>
  );
};

export default ChatContainer;
