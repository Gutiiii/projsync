import { useCreateComment } from '@/hooks/projectHooks/useCreateComment';
import { useGetComments } from '@/hooks/projectHooks/useGetComments';
import { Comment } from '@/types/project.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input, Skeleton } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { useSession } from 'next-auth/react';
import React, { FC } from 'react';
import Avatar from 'react-avatar';

interface BoardCommentsProps {
  projectId: string;
  cardId: string;
}

const BoardComments: FC<BoardCommentsProps> = ({ projectId, cardId }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: useCreateComment,
    onMutate: async (values) => {
      await queryClient.cancelQueries(['getComments']);
      const prevComments = queryClient.getQueryData(['getComments']);
      queryClient.setQueryData(['getComments'], [...prevComment, values]);
    },
  });

  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    isError: commentsIsError,
  } = useGetComments(session?.backendTokens.accessToken, cardId);

  if (commentsIsLoading) return <Skeleton />;

  if (commentsIsError)
    return <div>Something went wrong! Please try again later</div>;

  const comments: Comment[] = commentsData.data;

  return (
    <div className="max-h-[300px] overflow-y-auto mt-2">
      <div className="flex space-x-2 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-square-text"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M13 8H7" />
          <path d="M17 12H7" />
        </svg>
        <p className="text-xl font-medium -mt-1">Activity</p>
      </div>
      <div className="flex space-x-2 mb-3">
        <Avatar name={session?.user.name} round size="30" color="black" />
        <Input placeholder="Write a comment..." />
      </div>
      <div>
        {comments.map((comment) => {
          const timestamp = new Date(comment.createdAt);
          const timeAgo = formatDistanceToNow(timestamp, {
            addSuffix: true,
          });
          return (
            <div key={comment.id} className="my-2">
              <div className="flex">
                <Avatar
                  name={comment.author.user.name}
                  round
                  size="30"
                  color="black"
                  className="mr-2 mt-0.5"
                />
                <div className="grid grid-rows-2 w-full -space-y-1 -mt-1">
                  <div className="flex space-x-2">
                    <p className="font-bold">{comment.author.user.name}</p>
                    <p>{timeAgo}</p>
                  </div>

                  <p className="bg-gray-200 rounded-sm p-1">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardComments;
