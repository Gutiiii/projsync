'use client';
import { useCreateCard } from '@/hooks/projectHooks/useCreateCard';
import { useCreateList } from '@/hooks/projectHooks/useCreateList';
import { useGetCards } from '@/hooks/projectHooks/useGetCards';
import { useGetLists } from '@/hooks/projectHooks/useGetLists';
import { Card, List } from '@/types/project.types';
import { UserPayload } from '@/types/user.types';
import { DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Button, Spinner } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Board } from '../boardComponents/Board';
import BoardCard from '../boardComponents/BoardCard';
import BoardColumn from '../boardComponents/BoardColumn';
import BoardItem from '../boardComponents/BoardItem';
import CreateBoardCardModal from '../modal/CreateBoardCardModal';

const ProjectBoard = ({
  projectId,
  token,
  user,
}: {
  projectId: string;
  token?: string;
  user: UserPayload;
}) => {
  const router = useRouter();
  const [createdListId, setCreatedListId] = useState<string | undefined>('');
  const [createdCardListId, setCreatedCardListId] = useState<string>('');
  const [createBoardCardModalVisible, setCreateBoardCardModalVisible] =
    useState<boolean>(false);
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

  const mutationCreateCard = useMutation({ mutationFn: useCreateCard });
  //TODO Add Skeleton
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
        toast.success('List has been Created');
        setCreatedListId(data.data.id);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };

  const createCard = (listId: string, title: string) => {
    setCreateBoardCardModalVisible(false);
    const cardsInList = cards.filter((card) => card.listId === listId);
    const maxPosition =
      cardsInList.length > 0
        ? Math.max(...cardsInList.map((card) => card.position), 0)
        : -1;
    const position = maxPosition + 1;

    const values = {
      title,
      token,
      projectId,
      listId,
      position,
    };

    mutationCreateCard.mutateAsync(values, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['getCards'] });
        toast.success('Card has been Created');
        setCreatedCardListId('');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };
  console.log('LISTS: ', lists);
  return (
    <>
      <div className="mx-8">
        <Board>
          <SortableContext items={lists}>
            {lists.map((list) => (
              <BoardColumn
                data={list}
                user={user}
                position={list.position}
                key={list.id}
                id={list.id}
                title={list.title}
                count={cards.filter((card) => card.listId === list.id).length}
                createdListId={createdListId}
                onCreate={() => setCreatedListId('')}
              >
                {cards
                  .filter((card) => card.listId === list.id)
                  .map((card) => (
                    <BoardItem id={card.id} key={card.id}>
                      <BoardCard
                        user={user}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        updatedAt={card.updatedAt}
                        dueDate={card.dueDate}
                        projectId={projectId}
                      />
                    </BoardItem>
                  ))}

                {user.role !== 'VIEWER' && (
                  <Button
                    className="ml-3"
                    size="sm"
                    onClick={() => {
                      setCreatedCardListId(list.id);
                      setCreateBoardCardModalVisible(true);
                    }}
                  >
                    {mutationCreateCard.isLoading &&
                    createdCardListId === list.id ? (
                      <Spinner size="sm" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
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
                    Add Card
                  </Button>
                )}
              </BoardColumn>
            ))}
          </SortableContext>
          {user.role !== 'VIEWER' && (
            <Button className="mt-7" onClick={createList} size="sm">
              {mutationCreateList.isLoading ? (
                <Spinner size="sm" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
              {!mutationCreateList.isLoading && 'Add List'}
            </Button>
          )}
        </Board>
      </div>
      {createBoardCardModalVisible && (
        <CreateBoardCardModal
          visible={createBoardCardModalVisible}
          handleOnClose={() => {
            setCreateBoardCardModalVisible(false);
            setCreatedCardListId('');
          }}
          handleOnSubmit={createCard}
          listId={createdCardListId}
        />
      )}
    </>
  );
};

export default ProjectBoard;
