'use client';
import { useCreateList } from '@/hooks/projectHooks/useCreateList';
import { useGetCards } from '@/hooks/projectHooks/useGetCards';
import { useGetLists } from '@/hooks/projectHooks/useGetLists';
import { Card, List } from '@/types/project.types';
import { Button, Spinner } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Board, BoardContainer } from '../boardComponents/Board';
import ListCard from '../boardComponents/BoardCard';
import BoardColumn from '../boardComponents/BoardColumn';
import BoardItem from '../boardComponents/BoardItem';

const ProjectBoard = ({
  projectId,
  token,
}: {
  projectId: string;
  token?: string;
}) => {
  const router = useRouter();
  const [createdListId, setCreatedListId] = useState<string | undefined>('');
  const queryClient = useQueryClient();
  const { data: list, isLoading: listIsLoading } = useGetLists(
    token,
    projectId,
  );

  const { data: card, isLoading: cardIsLoading } = useGetCards(
    token,
    projectId,
  );

  const mutationCreateList = useMutation({ mutationFn: useCreateList });
  if (listIsLoading || cardIsLoading) return <div>Hello</div>;
  const lists: List[] = list?.data;
  const cards: Card[] = card?.data;

  const createList = () => {
    const maxPosition = Math.max(...lists.map((list) => list.position), 0);

    const position = maxPosition + 1;

    const title = 'New List ' + (lists.length + 1);

    const values = {
      title,
      token,
      position,
      projectId,
    };

    mutationCreateList.mutateAsync(values, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['getLists'] });
        toast.success('List has been created');
        setCreatedListId(data.data.id);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };
  return (
    <>
      <BoardContainer>
        <Board>
          {lists.map((list) => (
            <BoardColumn
              key={list.id}
              id={list.id}
              title={list.title}
              count={cards.filter((card) => card.listId === list.id).length}
              createdListId={createdListId}
            >
              {cards
                .filter((card) => card.listId === list.id)
                .map((card) => (
                  <BoardItem id={card.id} key={card.id}>
                    <ListCard
                      id={card.id}
                      title={card.title}
                      description={card.description}
                      updatedAt={card.updatedAt}
                      dueDate={card.dueDate}
                    />
                  </BoardItem>
                ))}
              <Button className="ml-3" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Add Card
              </Button>
            </BoardColumn>
          ))}
          <Button className="mt-2" onClick={createList}>
            {mutationCreateList.isLoading ? (
              <Spinner size="sm" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
            {!mutationCreateList.isLoading && 'Add List'}
          </Button>
        </Board>
      </BoardContainer>
    </>
  );
};

export default ProjectBoard;
