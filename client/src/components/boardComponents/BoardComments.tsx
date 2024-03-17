import { useCreateComment } from '@/hooks/projectHooks/useCreateComment';
import { useDeleteComment } from '@/hooks/projectHooks/useDeleteComment';
import { useEditComment } from '@/hooks/projectHooks/useEditComment';
import { useGetComments } from '@/hooks/projectHooks/useGetComments';
import { Comment } from '@/types/project.types';
import { Skeleton as ChakraSkeleton } from '@chakra-ui/react';
import { Spinner } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input, Skeleton } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { useSession } from 'next-auth/react';
import React, { FC, useState } from 'react';
import Avatar from 'react-avatar';
import { toast } from 'sonner';

interface BoardCommentsProps {
  projectId: string;
  cardId: string;
  userRole: string;
}

const BoardComments: FC<BoardCommentsProps> = ({
  projectId,
  cardId,
  userRole,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [content, setContent] = useState<string>('');
  const [commentEditId, setCommentEditId] = useState<string>('');
  const [commentDeleteId, setCommentDeleteId] = useState<string>('');
  const [commentEditValue, setCommentEditValue] = useState<string>('');
  const { mutate: editMutate, isLoading: editIsLoading } = useMutation({
    mutationFn: useEditComment,
    onMutate: () => {},
    onSuccess: () => {
      setCommentEditId('');
      toast.success('Comment Edited');
      queryClient.invalidateQueries({ queryKey: ['getComments'] });
    },
    onError: () => {
      setCommentEditId('');
      toast.error('Something went wrong');
    },
  });

  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation({
    mutationFn: useDeleteComment,
    onMutate: (data) => {
      setCommentDeleteId(data.commentId);
    },
    onSuccess: () => {
      toast.success('Comment Deleted');
      queryClient.invalidateQueries({ queryKey: ['getComments'] });
      setCommentDeleteId('');
    },
    onError: () => {
      setCommentDeleteId('');
      toast.error('Something went wrong');
    },
  });

  const { mutate, isLoading: createCommentIsLoading } = useMutation({
    mutationFn: useCreateComment,
  });

  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    isError: commentsIsError,
  } = useGetComments(session?.backendTokens.accessToken, cardId);

  if (commentsIsLoading) return <Skeleton />;

  if (commentsIsError)
    return (
      <p className="text-center">Something went wrong! Please refresh Page</p>
    );

  const comments: Comment[] = commentsData.data;

  const submit = () => {
    const values = {
      cardId,
      projectId,
      content,
      token: session?.backendTokens.accessToken,
    };
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries(['getComments']);
        toast.success('Comment created!');
        setContent('');
      },
      onError: () => {
        toast.error('Something went wrong! Please try again later');
        setContent('');
      },
    });
  };

  const edit = (commentId: string) => {
    const values = {
      commentId,
      content: commentEditValue,
      token: session?.backendTokens.accessToken,
    };
    editMutate(values);
  };

  const deleteComment = (commentId: string) => {
    const values = {
      commentId,
      token: session?.backendTokens.accessToken,
    };
    deleteMutate(values);
  };
  return (
    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden mt-2">
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
        <Input
          placeholder="Write a comment..."
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit();
            }
          }}
          value={content}
        />
        {createCommentIsLoading && <Spinner className="mr-2" />}
      </div>
      <div>
        {createCommentIsLoading && (
          <div className="my-2">
            <div className="flex">
              <ChakraSkeleton className="rounded-full w-8 h-7 mr-2" />
              <div className="grid grid-rows-2 w-full -space-y-1 -mt-1">
                <div className="flex space-x-2">
                  <ChakraSkeleton className="w-1/2 h-6 rounded-md mb-2" />
                </div>
                <ChakraSkeleton className="w-full h-6 rounded-md" />
              </div>
            </div>
          </div>
        )}
        {comments.map((comment) => {
          const timestamp = new Date(comment.createdAt);
          const timeAgo = formatDistanceToNow(timestamp, {
            addSuffix: true,
          });
          return (
            <div key={comment.id} className="my-2 relative">
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
                  {commentEditId !== comment.id && (
                    <div className="bg-gray-200 rounded-sm p-1 shadow-md w-full flex items-center">
                      <p>{comment.content}</p>
                      {comment.updatedAt !== comment.createdAt && (
                        <p
                          className="text-gray-600 ml-1.5"
                          style={{ fontSize: '0.7rem' }}
                        >
                          (edited)
                        </p>
                      )}
                    </div>
                  )}
                  {(comment.author.user.id === session?.user.id ||
                    userRole === 'CREATOR') && (
                    <div className="flex space-x-1 pt-2">
                      {comment.author.user.id === session?.user.id && (
                        <>
                          {commentEditId === comment.id &&
                          editIsLoading === false ? (
                            <Input
                              className="-mt-2"
                              defaultValue={comment.content}
                              onChange={(e: any) =>
                                setCommentEditValue(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  edit(comment.id);
                                }
                              }}
                            ></Input>
                          ) : (
                            <>
                              {commentEditId !== comment.id && (
                                <p
                                  className="underline cursor-pointer"
                                  onClick={() => setCommentEditId(comment.id)}
                                >
                                  Edit
                                </p>
                              )}
                              {editIsLoading &&
                                commentEditId === comment.id && (
                                  <Spinner size="sm" />
                                )}
                              <p>·</p>
                            </>
                          )}
                        </>
                      )}
                      {commentDeleteId !== comment.id &&
                        commentEditId !== comment.id && (
                          <p
                            className="underline cursor-pointer"
                            onClick={() => deleteComment(comment.id)}
                          >
                            Delete
                          </p>
                        )}
                      {deleteIsLoading && commentDeleteId === comment.id && (
                        <Spinner size="sm" />
                      )}
                    </div>
                  )}
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
