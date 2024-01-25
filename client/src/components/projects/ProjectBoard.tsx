'use client';
import { useGetCards } from '@/hooks/projectHooks/useGetCards';
import { useGetLists } from '@/hooks/projectHooks/useGetLists';
import { Card, List } from '@/types/project.types';
import React from 'react';
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
  const { data: list, isLoading: listIsLoading } = useGetLists(
    token,
    projectId,
  );

  const { data: card, isLoading: cardIsLoading } = useGetCards(
    token,
    projectId,
  );
  if (listIsLoading || cardIsLoading) return <div>Hello</div>;
  const lists: List[] = list?.data;
  const cards: Card[] = card?.data;
  console.log(cards);
  return (
    <>
      <BoardContainer>
        <Board>
          {lists.map((list) => (
            <BoardColumn
              key={list.id}
              id={list.id}
              title={list.title}
              description={list.description}
              count={cards.filter((card) => card.listId === list.id).length}
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
            </BoardColumn>
          ))}
        </Board>
      </BoardContainer>
    </>
  );
};

export default ProjectBoard;
