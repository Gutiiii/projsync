'use client';
import { PlusOutlined } from '@ant-design/icons';
import { UseDroppableArguments, useDroppable } from '@dnd-kit/core';
// import { Button } from '@nextui-org/react';

import { Badge, Button, Space } from 'antd';
import React, { FC } from 'react';
import { Text } from '../../components/text';

interface BoardColumnProps {
  children: React.ReactNode;
  id: string;
  title: string;
  description: string;
  count: number;
  data?: UseDroppableArguments['data'];
}

const BoardColumn: FC<BoardColumnProps> = ({
  children,
  id,
  title,
  description,
  count,
  data,
}) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

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
            <Text
              ellipsis={{ tooltip: 'Title' }}
              size="xs"
              strong
              style={{
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            // onClick={onAddClickHandler}
          />
        </Space>
        {description}
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
