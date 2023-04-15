import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/usersSlice';
import Board from './Board';
import LetterCollection from '../Letters/LetterCollection';
import '../../styling/GamePage.scss';

interface GamePageProps {
  navigate: ReturnType<typeof useNavigate>;
}

const GamePage: React.FC<GamePageProps> = ({ navigate }) => {

  const dispatch = useDispatch();
  const currentPlayers = useSelector((state: RootState) => state.users.currentPlayers);

  const showPlayers = () => {
    console.log(currentPlayers);
  }

  return (
    <div>
    <div>Game page</div>
    <button onClick={showPlayers}>show current players</button>
    <div className="board-container">
    <Board />
    </div>
    
    {currentPlayers.map(p => 
      <div>
        <LetterCollection />
      </div>
      )}
    </div>
  )
}

export default GamePage;