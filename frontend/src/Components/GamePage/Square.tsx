import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSquareIndex } from '../../redux/squaresSlice';
import { RootStateSquares } from '../../redux/squaresSlice';
import { RootStateLetters, addJustPlayed } from '../../redux/lettersSlice';
import '../../styling/Square.scss';

type SquareProps = {
  index: number;
}

const Square: React.FC<SquareProps> = ({ index }) => {

  const dispatch = useDispatch();
  const selectedSquareIndex = useSelector((state: RootStateSquares) => state.squares.selectedSquareIndex);
  const selectedLetter = useSelector((state: RootStateLetters) => state.letters.selectedLetter);

  const [squareType, setSquareType] = useState("normal-square");
  const [squareText, setSquareText] = useState("");
  const [squareLetter, setSquareLetter] = useState({});

  const tripleWordIndices = [0, 7, 14, 105, 119, 210, 217, 224];
  const doubleWordIndices = [16, 28, 32, 42, 48, 56, 64, 70, 154, 160, 168, 176, 182, 192, 196, 208];
  const tripleLetterIndices = [76, 80, 84, 88, 136, 140, 144, 148];
  const doubleLetterIndices = [3, 11, 45, 59, 92, 96, 98, 102, 108, 116, 122, 126, 128, 132, 165, 179, 213, 221];
  const middleIndex = 112;

  useEffect(() => {
    if (tripleWordIndices.includes(index)) {
      setSquareType("triple-word-square");
      setSquareText("TW");
    } else if (doubleWordIndices.includes(index)) {
      setSquareType("double-word-square");
      setSquareText("DW");
    } else if (tripleLetterIndices.includes(index)) {
      setSquareType("triple-letter-square");
      setSquareText("TL");
    } else if (doubleLetterIndices.includes(index)) {
      setSquareType("double-letter-square");
      setSquareText("DL");
    } else if (middleIndex === index) {
      setSquareType("middle-square");
    }
  }, [])

  const handleSetSelectedSquareIndex = () => {
    if (selectedLetter.value) {
      dispatch(setSelectedSquareIndex(index));
      dispatch(addJustPlayed(selectedLetter));
      setSquareLetter(selectedLetter);
      console.log(selectedLetter);
    } else {
      console.log(selectedLetter);
    }
  }

  return (
    <div className={`${squareType}${selectedLetter.value ? " selected-letter" : ""}`} onClick={handleSetSelectedSquareIndex}>{squareText}</div>
  )
}

export default Square;