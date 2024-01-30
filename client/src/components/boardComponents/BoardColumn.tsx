'use client';
import { useDeleteList } from '@/hooks/projectHooks/useDeleteList';
import { useEditList } from '@/hooks/projectHooks/useEditList';
import { UserPayload } from '@/types/user.types';
import { UseDroppableArguments, useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge, Space } from 'antd';
import { Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { toast } from 'sonner';
import { Text } from '../text';

interface BoardColumnProps {
  children: React.ReactNode;
  id: string;
  title: string;
  count: number;
  data?: UseDroppableArguments['data'];
  createdListId?: string;
  user: UserPayload;
  position: number;
  onCreate: () => void;
}

const BoardColumn: FC<BoardColumnProps> = ({
  children,
  id,
  title,
  count,
  data,
  createdListId,
  user,
  position,
  onCreate,
}) => {
  const { data: session } = useSession();
  const params = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();
  const projectId = params.projectId;
  const token = session?.backendTokens.accessToken;
  const [titleEdit, setTitleEdit] = useState<boolean>(createdListId === id);
  const [titleChange, setTitleChange] = useState<string>(title);
  const listEdit = useMutation({ mutationFn: useEditList });
  const listDelete = useMutation({ mutationFn: useDeleteList });

  const {
    isOver,
    setNodeRef,
    active,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id,
    data: {
      type: 'List',
      data,
    },
    disabled: titleEdit,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleTitleEdit = () => {
    if (user.role === 'VIEWER') return;
    handleListEdit();
  };

  const handleListEdit = () => {
    var title = titleChange;
    const values = { id, token, projectId, position, title };
    listEdit.mutateAsync(values, {
      onSuccess: () => {
        toast.success('List has been Edited');
        queryClient.invalidateQueries({ queryKey: ['getLists'] });
        setTitleEdit(false);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
      onSettled: () => {
        setTitleEdit(false);
        onCreate();
      },
    });
  };

  const handleListDelete = () => {
    const values = {
      id,
      projectId,
      token,
    };

    listDelete.mutateAsync(values, {
      onSuccess: () => {
        toast.success('List has been Deleted');
        queryClient.invalidateQueries({ queryKey: ['getLists'] });
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col p-4 "
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        style={{
          padding: '12px',
          cursor: 'grab',
        }}
      >
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Space className="relative">
            {titleEdit ? (
              <div>
                <Input
                  isDisabled={listEdit.isLoading}
                  isRequired
                  onBlur={() => {
                    if (listEdit.isLoading) return;
                    setTitleEdit(false);
                  }}
                  defaultValue={title}
                  onChange={(e: any) => setTitleChange(e.target.value)}
                  className=" -mt-2"
                  size="sm"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return;
                    handleTitleEdit();
                  }}
                />
              </div>
            ) : (
              <Text
                ellipsis={{ tooltip: 'Title' }}
                onClick={() => {
                  if (user.role === 'VIEWER') return;
                  setTitleEdit(true);
                }}
                className={listEdit.isLoading ? 'opacity-25' : ''}
                size="xs"
                strong
                style={{
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </Text>
            )}
            {listEdit.isLoading && (
              <Spinner className="absolute top-0.5 left-1 z-10" />
            )}

            {!!count && <Badge count={count} color="cyan" />}
            <div
              className={
                listDelete.isLoading
                  ? 'mt-1.5'
                  : 'rounded-full hover:bg-gray-300 active:bg-gray-400 active:scale-95 cursor-pointer p-1 mt-1 '
              }
            >
              {user.role !== 'VIEWER' &&
                (listDelete.isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <Trash2
                    onClick={handleListDelete}
                    className="text-center items-center justify"
                    size={'20'}
                  />
                ))}
            </div>
          </Space>
        </Space>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? 'unset' : 'auto',
          border: '2px dashed transparent',
          borderColor: isOver ? '#00000040' : 'transparent',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BoardColumn;
