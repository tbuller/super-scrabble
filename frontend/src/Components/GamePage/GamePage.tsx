import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialTurn, setNextTurn, addLetter } from '../../redux/usersSlice';
import { RootStateUsers } from '../../redux/usersSlice';
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

  const showPlayers = () => {
    console.log(currentPlayers);
  }

  return (
    <div>
    <div>Game page</div>
    <button onClick={handleNextTurn}>Next turn</button>
    <button onClick={showPlayers}>show current players</button>
    <div className="players-coontainer">
    <CurrentPlayers />
    </div>
    <div className="board-container">
    <Board />
    </div>
    
    {currentPlayers.map(p => 
      <div key={p._id}>
        <LetterCollection />
      </div>
      )}
    </div>
  )
}

export default GamePage;