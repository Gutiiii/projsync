'use client';
import { useMoveCard } from '@/hooks/projectHooks/useMoveCard';
import { useMoveList } from '@/hooks/projectHooks/useMoveList';
import { Card, List } from '@/types/project.types';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const Board = ({ children }: React.PropsWithChildren) => {
  const [activeList, setActiveList] = useState<List[] | null>(null);
  const [activeCard, setActiveCard] = useState<List[] | null>(null);
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.backendTokens.accessToken;
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  const [lists, setLists] = useState<List[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  const { mutate } = useMutation({
    mutationFn: useMoveList,
    onMutate: async (values) => {
      await queryClient.cancelQueries(['getLists']);

      const prevList = queryClient.getQueryData(['getLists']);

      queryClient.setQueryData(['getLists'], values.updatedLists);

      return { prevList };
    },
    onError: (_, __, context) => {
      toast.error('Failed');
      queryClient.setQueryData(['getLists'], () => context?.prevList);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getLists'] });
    },
    onSuccess: () => {
      toast.success('Moved');
    },
  });

  const { mutate: cardMutate } = useMutation({
    mutationFn: useMoveCard,
    onMutate: async (values) => {
      await queryClient.cancelQueries(['getCards']);

      const prevList = queryClient.getQueryData(['getCards']);

      queryClient.setQueryData(['getCards'], values.updatedCards);

      return { prevList };
    },
    onError: (_, __, context) => {
      toast.error('Failed');
      queryClient.setQueryData(['getCards'], () => context?.prevList);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getCards'] });
    },
    onSuccess: () => {
      toast.success('Moved');
    },
  });

  const onDragStart = (event: DragStartEvent) => {
    const lists: any = queryClient.getQueryData(['getLists']);
    const cards: any = queryClient.getQueryData(['getCards']);
    if (event.active.data.current?.type === 'List') {
      setActiveList(event.active.data.current.list);
      setLists(lists);
      return;
    }
    if (event.active.data.current?.type === 'Card') {
      setActiveCard(event.active.data.current.card);
      setCards(cards);
      return;
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const isActiveAList = active.data.current?.type === 'List';

    if (!isActiveAList) return;

    const activeListId = active.id;
    const overListId = over.id;

    if (activeListId === overListId) return;

    const activeListPosition = active.data.current?.data.position;

    const overListPosition = over.data.current?.data.position;
    const updatedLists = lists.map((list) => {
      if (activeListPosition > overListPosition) {
        if (
          list.position >= overListPosition &&
          list.position < activeListPosition
        ) {
          return { ...list, position: list.position + 1 };
        } else if (list.id === activeListId) {
          return { ...list, position: overListPosition };
        }
      } else if (activeListPosition < overListPosition) {
        if (
          list.position <= overListPosition &&
          list.position > activeListPosition
        ) {
          return { ...list, position: list.position - 1 };
        } else if (list.id === activeListId) {
          return { ...list, position: overListPosition };
        }
      }
      return list;
    });

    const values = {
      projectId,
      activeListId,
      overListId,
      activeListPosition,
      overListPosition,
      token,
      updatedLists,
    };

    mutate(values);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === 'Card';
    const isOverACard = over.data.current?.type === 'Card';

    if (!isActiveACard) return;

    //Check if is Dropped in same List
    if (isActiveACard && isOverACard) {
      const activeCardPosition = active.data.current?.data.position;
      const activeCardId = active.id;
      const overCardPosition = over.data.current?.data.position;
      const activeListId = active.data.current?.data.listId;
      const overListId = over.data.current?.data.listId;
      let updatedCards = [];

      if (activeListId === overListId) {
        updatedCards = cards.map((card) => {
          if (activeCardPosition > overCardPosition) {
            if (
              card.position >= overCardPosition &&
              card.position < activeCardPosition
            ) {
              return { ...card, position: card.position + 1 };
            } else if (card.id === activeCardId) {
              return { ...card, position: overCardPosition };
            }
          } else if (activeCardPosition < overCardPosition) {
            if (
              card.position <= overCardPosition &&
              card.position > activeCardPosition
            ) {
              return { ...card, position: card.position - 1 };
            } else if (card.id === activeCardId) {
              return { ...card, position: overCardPosition };
            }
          }
          return card;
        });
      } else {
        updatedCards = cards.map((card) => {
          if (
            activeCardPosition < card.position &&
            activeListId === card.listId &&
            activeCardId !== card.id
          ) {
            return { ...card, position: card.position - 1 };
          } else if (
            activeCardPosition >= overCardPosition &&
            overListId === card.listId
          ) {
            return { ...card, position: card.position + 1 };
          } else if (activeCardId === card.id) {
            return { ...card, listId: overListId };
          }
          return card;
        });
      }
      const values = {
        projectId,
        activeCardId: activeId,
        activeListId,
        overListId,
        overCardId: overId,
        activeCardPosition,
        overCardPosition,
        updatedCards,
        token: session?.backendTokens.accessToken,
      };
      cardMutate(values);
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );
  return (
    <DndContext
      onDragStart={onDragStart}
      sensors={sensors}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div
        style={{
          width: 'calc(100% + 64px)',
          height: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'column',
          margin: '-32px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '32px',
            overflow: 'scroll',
          }}
        >
          {children}
        </div>
      </div>
    </DndContext>
  );
};
