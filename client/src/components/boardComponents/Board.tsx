'use client';
import { useEditList } from '@/hooks/projectHooks/useEditList';
import { useGetLists } from '@/hooks/projectHooks/useGetLists';
import { useMoveList } from '@/hooks/projectHooks/useMoveList';
import { List } from '@/types/project.types';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.backendTokens.accessToken;
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  const [lists, setLists] = useState<List[]>([]);

  const { mutateAsync } = useMutation({
    mutationFn: useMoveList,
    onMutate: async (values) => {
      await queryClient.cancelQueries(['getLists']);

      console.log('UP: ', values.updatedLists);

      console.log(queryClient.getQueryData(['getLists']));

      console.log(
        queryClient.setQueryData(['getLists'], (data) => {
          return {
            data: {
              data: values.updatedLists,
            },
          };
        }),
      );

      return { prevList: lists };
    },
    onError: (_, __, context) => {
      toast.error('Failed');
      queryClient.setQueryData(['getLists'], () => context?.prevList);
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['getLists'] });
    },
    onSuccess: () => {
      toast.success('Moved');
    },
  });

  const onDragStart = (event: DragStartEvent) => {
    const data: any = queryClient.getQueryData(['getLists']);
    console.log(data.data);
    if (event.active.data.current?.type === 'List') {
      setActiveList(event.active.data.current.list);
      console.log(data.data);
      setLists(data.data);
      return;
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeListId = active.id;
    const overListId = over.id;

    if (activeListId === overListId) return;

    const activeListPosition = active.data.current?.data.position;

    const overListPosition = over.data.current?.data.position;

    const updatedLists = lists.map((list) => {
      if (list.id === activeListId) {
        return { ...list, position: overListPosition };
      } else if (list.id === overListId) {
        return { ...list, position: activeListPosition };
      }
      return list; // Add this line to cover other cases
    });
    // setLists((prevLists) => {
    //   const updatedLists = prevLists.map((list) => {
    //     if (list.id === activeListId) {
    //       return { ...list, position: overListPosition };
    //     } else if (list.id === overListId) {
    //       return { ...list, position: activeListPosition };
    //     }
    //     return list;
    //   });
    //   return updatedLists;
    // });

    const values = {
      projectId,
      activeListId,
      overListId,
      activeListPosition,
      overListPosition,
      token,
      updatedLists,
    };

    mutateAsync(values);
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
    >
      <BoardContainer>{children}</BoardContainer>
    </DndContext>
  );
};
