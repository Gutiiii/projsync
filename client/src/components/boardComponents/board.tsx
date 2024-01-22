import { DragDropContext } from '@hello-pangea/dnd';
export const BoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export const Board = ({ children }: React.PropsWithChildren) => {
  return <div>{children}</div>;
};
