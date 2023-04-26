import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialTurn, setNextTurn, addLetter } from '../../redux/usersSlice';
import { RootStateUsers } from '../../redux/usersSlice';
import { emptyJustPlayed } from '../../redux/lettersSlice';
import { RootStateLetters } from '../../redux/lettersSlice';
import { addWord } from '../../redux/wordsSlice';
import { RootStateSquares } from '../../redux/squaresSlice';
import { removeBadWord } from '../../redux/squaresSlice';
import Board from './Board';
import CurrentPlayers from './CurrentPlayers';
import LetterCollection from '../Letters/LetterCollection';
import '../../styling/GamePage.scss';

interface GamePageProps {
  navigate: ReturnType<typeof useNavigate>;
}

const GamePage: React.FC<GamePageProps> = ({ navigate }) => {

  const dispatch = useDispatch();
  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);
  const currentTurn = useSelector((state: RootStateUsers) => state.users.currentTurn);
  const justPlayed = useSelector((state: RootStateLetters) => state.letters.justPlayed);
  const allPlayedSquares = useSelector((state: RootStateSquares) => [...state.squares.playedSquaresIndicesLetter].sort((a: any, b: any) => a.index - b.index));

  const [inputText, setInputText] = useState("");
  const [errorMade, setErrorMade] = useState(false);

  useEffect(() => {
    dispatch(setInitialTurn(currentPlayers[0]));
  }, [currentPlayers.length])

  const handleNextTurn = async () => {
    const wordIndices = assembleWord();
    checkWord().then(isValid => {
      if (isValid) {
        dispatch(emptyJustPlayed([]));
        const currentTurnIndex = currentPlayers.findIndex(p => p._id === currentTurn?._id);
    
        if (currentTurnIndex < currentPlayers.length - 1) {
          dispatch(setNextTurn(currentPlayers[currentTurnIndex + 1]));
        } else {
          dispatch(setNextTurn(currentPlayers[0]));
        }
      } else {
        justPlayed.forEach((letter: any) => {
          dispatch(addLetter({ userId: letter.playerId, letter: letter.letter }));
          dispatch(removeBadWord(justPlayed));
        })
        dispatch(emptyJustPlayed([]));
      }
    });
  }

  const indexToRowColumn = (index: number) => {
    const row = Math.floor(index / 15);
    const col = index % 15;
    return { row, col };
  }

  const findSquare = (row: number, col: number) => {
    const index = row * 15 + col;
    return allPlayedSquares.find((square: any) => square.index === index);
  };

  const assembleWord = () => {
    const sortedWord = [...justPlayed].sort((a: any, b: any) => a.squareIndex - b.squareIndex);
  
    let isHorizontal;
    if (sortedWord.length === 1) {
      const { row, col } = indexToRowColumn(sortedWord[0].squareIndex);
      const hasLeftNeighbor = col > 0 && findSquare(row, col - 1);
      const hasRightNeighbor = col < 14 && findSquare(row, col + 1);
      isHorizontal = hasLeftNeighbor || hasRightNeighbor;
    } else {
      isHorizontal = sortedWord.every((tile: any, i: any, arr: any) => {
        const currentTile = indexToRowColumn(tile.squareIndex);
        const previousTile = i === 0 ? null : indexToRowColumn(arr[i - 1].squareIndex);
        return i === 0 || currentTile.row === previousTile?.row;
      });
    }
  
    console.log("Is horizontal:", isHorizontal);

    let currentIndex = sortedWord[0].squareIndex;
    let relevantIndices = [];
  
    if (isHorizontal) {
      let { row, col } = indexToRowColumn(currentIndex);
  
      while (col > 0 && findSquare(row, col - 1)) {
        currentIndex--;
        col--;
      }
  
      while (col < 15 && findSquare(row, col)) {
        relevantIndices.push(currentIndex);
        currentIndex++;
        col++;
      }
    } else {
      let { row, col } = indexToRowColumn(currentIndex);
  
      while (row > 0 && findSquare(row - 1, col)) {
        currentIndex -= 15;
        row--;
      }
  
      while (row < 15 && findSquare(row, col)) {
        relevantIndices.push(currentIndex);
        currentIndex += 15;
        row++;
      }
    }

    console.log("Relevant indices:", relevantIndices);
    
    return relevantIndices;
  }

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  }

  const checkWord = () => {
    const wordIndices = assembleWord();
    const wordToCheck = allPlayedSquares.filter((square: any) => wordIndices.includes(square.index)).map((square: any) => square.letter.letter).join("");
    // const wordToCheck = justPlayed.map((w: any) => w.letter.letter).join("");
    console.log(wordToCheck);
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`)
      .then(response => response.json())
      .then(data => {
        if (data[0]?.word) {
          return true;
        } else {
          return false;
        }
      })
  }
  
  const showPlayers = () => {
    console.log(currentPlayers);
    console.log(justPlayed);
    console.log(allPlayedSquares);
  }

  return (
    <div>
    <div>Game page</div>
    <button onClick={handleNextTurn}>Next turn</button>
    <input type="text" onChange={handleInputChange} />
    <button onClick={checkWord}>check word</button>
    <button onClick={showPlayers}>show current players</button>
    <button onClick={assembleWord}>assemble word</button>
    <div className="players-coontainer">
    <CurrentPlayers />
    </div>
    <div className="board-container">
    <Board />
    </div>
    <div>
    <LetterCollection />
    </div>
    </div>
  )
}

export default GamePage;