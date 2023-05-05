import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialTurn, setNextTurn, addLetter } from '../../redux/usersSlice';
import { addPlayerScore } from '../../redux/usersSlice';
import { RootStateUsers } from '../../redux/usersSlice';
import { emptyJustPlayed } from '../../redux/lettersSlice';
import { RootStateLetters } from '../../redux/lettersSlice';
import { addWord } from '../../redux/wordsSlice';
import { RootStateSquares } from '../../redux/squaresSlice';
import { removeBadWord } from '../../redux/squaresSlice';
import { RootStateGame } from '../../redux/gameSlice';
import { endGame } from '../../redux/gameSlice';
import Board from './Board';
import CurrentPlayers from './CurrentPlayers';
import LetterCollection from '../Letters/LetterCollection';
import ScoreBoard from './ScoreBoard';
import ErrorWarning from './ErrorWarning';
import GameEnded from './GameEnded';
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
  const letters = useSelector((state: RootStateLetters) => state.letters.letters);
  const gameEnded = useSelector((state: RootStateGame) => state.game.gameEnded);

  const [inputText, setInputText] = useState("");
  const [errorMade, setErrorMade] = useState(false);
  const [wrongWord, setWrongWord] = useState("");

  useEffect(() => {
    dispatch(setInitialTurn(currentPlayers[0]));
  }, [currentPlayers.length])

  const calculateScoreToAdd = () => {
    const wordIndices = assembleWord();
    const lettersToCount = allPlayedSquares.filter((square: any) => wordIndices.includes(square.index)).map((square: any) => square);
    lettersToCount.forEach(letter => {
      console.log(letter);
      dispatch(addPlayerScore({ userId: currentTurn?._id, points: letter.letter.value }));
    })
  }

  const handleNextTurn = async () => {
    checkWord().then(isValid => {
      if (isValid) {
        calculateScoreToAdd();
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
    let lettersRemaining = 0;
    letters.forEach(letter => lettersRemaining += letter.count);
    console.log(lettersRemaining);
    if (lettersRemaining <= 0) {
      console.log("game has ended");
      dispatch(endGame({}));
    }
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
    console.log(wordToCheck);
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`)
      .then(response => response.json())
      .then(data => {
        if (data[0]?.word) {
          return true;
        } else {
          setErrorMade(true);
          setWrongWord(wordToCheck);
          return false;
        }
      })
  }

  const closeErrorWarning = () => {
    setErrorMade(false);
  }
  
  const showPlayers = () => {
    console.log(currentPlayers);
    console.log(justPlayed);
    console.log(allPlayedSquares);
  }

  return (
    <div>
    {!gameEnded &&
    <>
     <h1>Game page</h1>
    <button onClick={handleNextTurn}>Next turn</button>
    <input type="text" onChange={handleInputChange} />
    <button onClick={checkWord}>check word</button>
    <button onClick={showPlayers}>show current players</button>
    <button onClick={assembleWord}>assemble word</button>
    <ScoreBoard />
    <div className="players-container">
    <CurrentPlayers />
    </div>
    <div className="board-container">
    {
    errorMade &&
    <div className="error-warning-component-container">
    <button className="close-error-warning" onClick={closeErrorWarning}>X</button>   
    <ErrorWarning wrongWord={wrongWord} />
    </div>
    }
    <Board />
    </div>
    <div>
    <LetterCollection />
    </div>
    </>
    }
    {gameEnded &&
      <div className="game-ended-wrapper">
        <GameEnded />
      </div>
    }
    </div>
  )
}

export default GamePage;