import React from 'react';
import Square from './Square';
import '../../styling/Board.scss';

const Board = () => {

  const indexes = Array.from({ length: 225 }, (_, index) => index);

  return (
    <div className="square-container">
    <Square squareType="normal" />
    </div>
  )
}

export default Board;