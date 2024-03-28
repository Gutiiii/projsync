'use client';
import { Button, Spinner } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { toast } from 'sonner';

interface ChatInputProps {
  socket: Socket;
  projectId: string;
}

const ChatInput: FC<ChatInputProps> = ({ socket, projectId }) => {
  const [message, setMessage] = useState<string>('');
  const { data: session, status } = useSession();

  const sendMessage = () => {
    if (!socket) return;
    if (message.trim() !== '' && session) {
      // Check if session is available
      socket.emit('newMessage', {
        content: message,
        projectId: projectId,
        authorId: session.user.id,
      });
      setMessage('');
    }
  };

  if (status === 'loading') {
    // Show loading indicator while session data is being fetched
    return (
      <div className="flex space-x-2 items-center text-center justify-center">
        <Spinner />
        <p>Connecting to the Chat</p>
      </div>
    );
  }

  return (
    <div className="ml-8 flex items-center">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="outline-none w-full h-full"
        placeholder="Enter your Message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage();
        }}
      ></input>
      <Button color="primary" size="sm" onClick={sendMessage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-send-horizontal"
        >
          <path d="m3 3 3 9-3 9 19-9Z" />
          <path d="M6 12h16" />
        </svg>
      </Button>
    </div>
  );
};

export default ChatInput;
