'use client';
import { DragOverlay, UseDraggableArguments } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

interface BoardItemProps {
  id: string;
  data?: UseDraggableArguments['data'];
  modalVisible: boolean;
}

const BoardItem = ({
  children,
  id,
  data,
  modalVisible,
}: React.PropsWithChildren<BoardItemProps>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    active,
    transition,
    transform,
    isOver,
  } = useSortable({
    id,
    data: {
      type: 'Card',
      data,
    },
    disabled: modalVisible,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      className="ml-3 relative"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
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

export default BoardItem;
