'use client';
import { useCreateCard } from '@/hooks/projectHooks/useCreateCard';
import { useCreateList } from '@/hooks/projectHooks/useCreateList';
import { useGetCards } from '@/hooks/projectHooks/useGetCards';
import { useGetLists } from '@/hooks/projectHooks/useGetLists';
import { Card, List } from '@/types/project.types';
import { UserPayload } from '@/types/user.types';
import {
  SortableContext,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Spinner } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Board } from '../boardComponents/Board';
import BoardCard from '../boardComponents/BoardCard';
import BoardColumn from '../boardComponents/BoardColumn';
import BoardItem from '../boardComponents/BoardItem';
import CreateBoardCardModal from '../modal/CreateBoardCardModal';

interface CardExtend extends Card {
  list: any;
  projectCardAssignee: any;
}

const ProjectBoard = ({
  projectId,
  token,
  user,
}: {
  projectId: string;
  token?: string;
  user: UserPayload;
}) => {
  const [createdListId, setCreatedListId] = useState<string | undefined>('');
  const [createdCardListId, setCreatedCardListId] = useState<string>('');
  const [createBoardCardModalVisible, setCreateBoardCardModalVisible] =
    useState<boolean>(false);

  const [editBoardCardModalVisible, setEditBoardCardModalVisible] =
    useState<boolean>(false);

  const queryClient = useQueryClient();
  const { data: lists, isLoading: listIsLoading } = useGetLists(
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
  if (listIsLoading || cardIsLoading)
    return (
      <div className="mx-12 mt-12">
        <Skeleton className="" />
      </div>
    );

  const cards: CardExtend[] = card;

  const createList = () => {
    const maxPosition = Math.max(
      ...lists.map((list: List) => list.position),
      0,
    );

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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getCards'] });
        toast.success('Card has been Created');
        setCreatedCardListId('');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };

  return (
    <>
      <div className="mx-8">
        <Board>
          <SortableContext items={lists}>
            {lists
              .sort((a: List, b: List) => a.position - b.position)
              .map((list: List) => (
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
                  modalVisible={editBoardCardModalVisible}
                  cards={cards.filter((card) => card.listId === list.id)}
                >
                  {cards
                    .filter((card) => card.listId === list.id)
                    .sort((a: Card, b: Card) => a.position - b.position)
                    .map((card) => (
                      <BoardItem
                        key={card.id}
                        id={card.id}
                        data={card}
                        modalVisible={editBoardCardModalVisible}
                      >
                        <BoardCard
                          user={user}
                          id={card.id}
                          projectId={projectId}
                          card={card}
                          setModalVisible={() =>
                            setEditBoardCardModalVisible(
                              !editBoardCardModalVisible,
                            )
                          }
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
              Add List
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
