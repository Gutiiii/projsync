'use client';
import {
  DragOverlay,
  useDraggable,
  UseDraggableArguments,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

interface BoardItemProps {
  id: string;
  data?: UseDraggableArguments['data'];
}

const BoardItem = ({
  children,
  id,
  data,
}: React.PropsWithChildren<BoardItemProps>) => {
  const { attributes, listeners, setNodeRef, active } = useSortable({
    id,
    data,
  });

  return (
    <div
      style={{
        position: 'relative',
      }}
      className="ml-3"
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: '8px',
          position: 'relative',
          cursor: 'grab',
        }}
      >
        {children}
      </div>
      {active?.id === id && (
        // antd sider has z-index of 999
        <DragOverlay zIndex={1000}>
          <div
            style={{
              borderRadius: '8px',
              boxShadow:
                '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08)',
              cursor: 'grabbing',
            }}
          >
            {children}
          </div>
        </DragOverlay>
      )}
    </div>
  );
};

export default BoardItem;
