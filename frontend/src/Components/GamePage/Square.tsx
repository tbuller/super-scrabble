import React from 'react';
import '../../styling/Square.scss';

type SquareProps = {
  squareType: string;
}

const Square: React.FC<SquareProps> = ({ squareType }) => {

  return (
    <div className="square"></div>
  )
}

export default Square;