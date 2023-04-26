import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialTurn, setNextTurn } from '../../redux/usersSlice';
import { RootStateUsers } from '../../redux/usersSlice';
import { RootStateLetters } from '../../redux/lettersSlice';
import { addWord } from '../../redux/wordsSlice';
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

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    dispatch(setInitialTurn(currentPlayers[0]));
  }, [currentPlayers.length])

  const handleNextTurn = () => {
    const currentTurnIndex = currentPlayers.findIndex(p => p._id === currentTurn?._id);
    
    if (currentTurnIndex < currentPlayers.length - 1) {
      dispatch(setNextTurn(currentPlayers[currentTurnIndex + 1]));
    } else {
      dispatch(setNextTurn(currentPlayers[0]));
    }
  }

  const indexToRowColumn = (index) => {
    const row = Math.floor(index / 15);
    const column = index % 15;
    return { row, column };
  };

  const assembleWord = () => {
    const sortedWord = justPlayed.sort((a: any, b: any) => a.squareIndex - b.squareIndex).join();
    dispatch(addWord(sortedWord))
  }

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  }

  const showPlayers = () => {
    console.log(currentPlayers);
    console.log(justPlayed);
  }

  const checkWord = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputText}`)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <div>
    <div>Game page</div>
    <button onClick={handleNextTurn}>Next turn</button>
    <input type="text" onChange={handleInputChange} />
    <button onClick={checkWord}>check word</button>
    <button onClick={showPlayers}>show current players</button>
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