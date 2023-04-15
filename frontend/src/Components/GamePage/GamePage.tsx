import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/usersSlice';

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
    </div>
  )
}

export default GamePage;