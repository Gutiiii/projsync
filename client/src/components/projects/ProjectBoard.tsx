import React from 'react';
import { Board, BoardContainer } from '../boardComponents/board';
import BoardColumn from '../boardComponents/column';

const ProjectBoard = () => {
  return (
    <>
      <div className="pr-8 text-3xl font-thin">Project Board</div>
      <BoardContainer>
        <Board>
          <BoardColumn></BoardColumn>
          <BoardColumn></BoardColumn>
        </Board>
      </BoardContainer>
    </>
  );
};

export default ProjectBoard;
