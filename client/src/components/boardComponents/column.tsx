'use client';
import { PlusOutlined } from '@ant-design/icons';
import { useDroppable } from '@dnd-kit/core';
import { Button } from '@nextui-org/react';

import { Badge, Space } from 'antd';
import React from 'react';

const BoardColumn = () => {
  const count = 0;
  const { isOver, setNodeRef, active } = useDroppable({
    id: '',
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
            {/* ADD TOOLTIP TO TITLE */}
            <p>TITLE TO DO</p>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button isIconOnly radius="full" size="sm">
            <PlusOutlined />
          </Button>
        </Space>
        <p
          style={{
            flex: 1,
            overflowY: active ? 'unset' : 'scroll',
            border: '2px dashed transparent',
            borderColor: isOver ? '#000040' : 'transparent',
          }}
        >
          Description
        </p>
      </div>
    </div>
  );
};

export default BoardColumn;
