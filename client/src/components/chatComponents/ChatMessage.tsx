'use client';
import React, { FC } from 'react';
import Avatar from 'react-avatar';
import { Socket } from 'socket.io-client';

interface ChatMessageProps {
  isCurrentSender: boolean;
  message: string;
  userName: string;
}

const ChatMessage: FC<ChatMessageProps> = ({
  isCurrentSender,
  message,
  userName,
}) => {
  if (isCurrentSender) {
    return (
      <>
        <div className="flex items-end justify-end  mr-4">
          <p className="mx-4 my-2 bg-gradient-to-br to-[#24a0f2] from-[#2541d8] rounded-md p-2 w-1/2 text-white text-sm font-semibold">
            {message}
          </p>
          <Avatar
            name="Samuel Gutmans"
            color="black "
            round
            size="40"
            className="mb-1.5"
          />
        </div>
      </>
    );
  } else {
    return (
      <div className="flex items-start justify-start ml-4">
        <Avatar
          name="Sanmuel Gutmans"
          color="black "
          round
          size="40"
          className="mt-[3px]"
        />
        <p className="mx-4 my-2 bg-slate-300 rounded-md p-2 w-1/2  text-black text-sm font-semibold">
          {message}
        </p>
      </div>
    );
  }
};

export default ChatMessage;
