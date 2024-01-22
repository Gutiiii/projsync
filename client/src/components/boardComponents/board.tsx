import { DndContext } from '@dnd-kit/core';
export const BoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export const Board = ({ children }: React.PropsWithChildren) => {
  return <DndContext>{children}</DndContext>;
};
