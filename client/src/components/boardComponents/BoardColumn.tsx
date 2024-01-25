'use client';
import { PlusOutlined } from '@ant-design/icons';
import { UseDroppableArguments, useDroppable } from '@dnd-kit/core';
// import { Button } from '@nextui-org/react';

import { Input } from '@nextui-org/react';
import { Badge, Button, Space } from 'antd';
import React, { FC, useState } from 'react';
import { Text } from '../text';

interface BoardColumnProps {
  children: React.ReactNode;
  id: string;
  title: string;
  count: number;
  data?: UseDroppableArguments['data'];
  createdListId?: string;
}

const BoardColumn: FC<BoardColumnProps> = ({
  children,
  id,
  title,
  count,
  data,
  createdListId,
}) => {
  const [titleEdit, setTitleEdit] = useState<boolean>(createdListId === id);
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const handleTitleEdit = () => {
    setTitleEdit(false);
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
              <Input
                isRequired
                defaultValue={title}
                size="sm"
                className=" -mt-2"
                autoFocus={createdListId === id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTitleEdit();
                  }
                }}
              />
            ) : (
              <Text
                ellipsis={{ tooltip: 'Title' }}
                onClick={() => setTitleEdit(true)}
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
