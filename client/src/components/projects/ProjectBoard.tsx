import React from 'react';
import { Board, BoardContainer } from '../boardComponents/board';
import BoardColumn from '../boardComponents/column';

const ProjectBoard = () => {
  return (
    <>
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
