import { useDroppable } from '@dnd-kit/core';
import React from 'react';

const BoardColumn = () => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: '',
    data: '',
  });
  return (
    <div ref={setNodeRef} className="flex flex-col p-[16px]">
      <div className="p-[12px]"></div>
      BoardColumn
    </div>
  );
};

export default BoardColumn;
