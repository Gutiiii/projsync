'use client';
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
} from '@dnd-kit/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const BoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
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
  );
};

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

  const onDragStart = (event: DragStartEvent) => {
    const data: any = queryClient.getQueryData(['getLists']);
    if (event.active.data.current?.type === 'List') {
      setActiveList(event.active.data.current.list);
      setLists(data);
      return;
    }
    if (event.active.data.current?.type === 'Card') {
      setActiveCard(event.active.data.current.card);
      setCards(data);
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const isActiveAList = active.data.current?.type === 'List';

    if (!isActiveAList) return;

    console.log('DRAG END');
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

    console.log(over);

    const isActiveACard = active.data.current?.type === 'Card';
    const isOverACard = over.data.current?.type === 'Card';

    if (!isActiveACard) return;

    //Check if is Dropped in same List
    if (isActiveACard && isOverACard) {
      console.log('SAME LIST');
    }
    // if (event.active.data.current?.type === 'Card') {
    //   const activeCardId = active.id;
    //   const overCardId = over.id;
    //   console.log('ACTIVE: ', active);
    //   console.log('OVER:', over);
    //   if (activeCardId === overCardId) return;
    //   const activeCardPosition = active.data.current?.data.position;
    //   console.log('ACTIVEPOSS:', activeCardPosition);
    //   const overCardPosition = over.data.current?.data.position;
    //   console.log('OVERPOS: ', overCardPosition);
    //   //   const updatedLists = lists.map((list) => {
    //   //     if (activeListPosition > overListPosition) {
    //   //       if (
    //   //         list.position >= overListPosition &&
    //   //         list.position < activeListPosition
    //   //       ) {
    //   //         return { ...list, position: list.position + 1 };
    //   //       } else if (list.id === activeCardId) {
    //   //         return { ...list, position: overListPosition };
    //   //       }
    //   //     } else if (activeListPosition < overListPosition) {
    //   //       if (
    //   //         list.position <= overListPosition &&
    //   //         list.position > activeListPosition
    //   //       ) {
    //   //         return { ...list, position: list.position - 1 };
    //   //       } else if (list.id === activeCardId) {
    //   //         return { ...list, position: overListPosition };
    //   //       }
    //   //     }
    //   //     return list;
    //   // }
    // }
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
      <BoardContainer>{children}</BoardContainer>
    </DndContext>
  );
};
