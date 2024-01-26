'use client';
import { useDeleteList } from '@/hooks/projectHooks/useDeleteList';
import { useEditList } from '@/hooks/projectHooks/useEditList';
import { UserPayload } from '@/types/user.types';
import { UseDroppableArguments, useDroppable } from '@dnd-kit/core';
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
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

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
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px',
      }}
    >
      <div
        style={{
          padding: '12px',
        }}
      >
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            {titleEdit ? (
              <div className="relative">
                <Input
                  isDisabled={listEdit.isLoading}
                  isRequired
                  defaultValue={title}
                  onChange={(e: any) => setTitleChange(e.target.value)}
                  size="sm"
                  className=" -mt-2"
                  autoFocus={createdListId === id}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleTitleEdit();
                    }
                  }}
                />
                {listEdit.isLoading && (
                  <Spinner className="absolute top-2 left-1/3 z-10" />
                )}
              </div>
            ) : (
              <Text
                ellipsis={{ tooltip: 'Title' }}
                onClick={() => {
                  if (user.role === 'VIEWER') return;
                  setTitleEdit(true);
                }}
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
