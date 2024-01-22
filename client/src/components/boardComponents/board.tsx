'use client';
import { DndContext } from '@dnd-kit/core';
export const BoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-[calc(100%+64px)] h-[calc(100%-64px)] flex justify-evenly m-[-32px]">
      <div className="w-[100%] h-[100%] flex p-[32px] overflow-scroll">
        {children}
      </div>
    </div>
  );
};

export const Board = ({ children }: React.PropsWithChildren) => {
  return <DndContext>{children}</DndContext>;
};
