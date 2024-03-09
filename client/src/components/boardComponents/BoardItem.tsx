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
  const { attributes, listeners, setNodeRef, active, transition, transform } =
    useSortable({
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
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: '8px',
          position: 'relative',
          cursor: 'grab',
        }}
      >
        {children}
      </div>
      {active?.id === id && (
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
