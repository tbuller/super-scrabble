import React from 'react';
import Square from './Square';
import '../../styling/Board.scss';

const Board = () => {

  const indexes = Array.from({ length: 225 }, (_, index) => index);

  return (
    <div className="square-container">
    {
      Array.from(Array(15).keys()).map((rowIndex) => (
        <div className="square-row" key={`row-${rowIndex}`}>
          {
            Array.from(Array(15).keys()).map((colIndex) => (
              <Square key={`${rowIndex}-${colIndex}`} index={colIndex * 15 + rowIndex} />
            ))
          }
        </div>
      ))
    }
  </div>
  )
}

export default Board;