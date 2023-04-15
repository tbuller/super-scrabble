import React from 'react';
import { useEffect, useState } from 'react';
import '../../styling/Square.scss';

type SquareProps = {
  index: number;
}

const Square: React.FC<SquareProps> = ({ index }) => {

  const [squareType, setSquareType] = useState("normal-square");
  const [squareText, setSquareText] = useState("");

  const tripleWordIndexes = [0, 7, 14, 105, 119, 210, 217, 224];
  const doubleWordIndexes = [16, 28, 32, 42, 48, 56, 64, 70];

  useEffect(() => {
    if (tripleWordIndexes.includes(index)) {
      setSquareType("triple-word-square");
    } else if (doubleWordIndexes.includes(index)) {
      setSquareType("double-word-square");
    }
  }, [])

  const showIndex = () => {
    console.log(index);
  }

  return (
    <div className={squareType} onClick={showIndex}></div>
  )
}

export default Square;