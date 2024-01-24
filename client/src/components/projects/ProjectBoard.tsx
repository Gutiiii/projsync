import React from 'react';
import { Board, BoardContainer } from '../boardComponents/board';
import BoardColumn from '../boardComponents/column';
import BoardItem from '../boardComponents/item';

const ProjectBoard = () => {
  return (
    <>
      <BoardContainer>
        <Board>
          <BoardColumn>
            <BoardItem>To Do</BoardItem>
          </BoardColumn>
          <BoardColumn></BoardColumn>
        </Board>
      </BoardContainer>
    </>
  );
};

export default ProjectBoard;
