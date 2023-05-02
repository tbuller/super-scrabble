import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';

const GameEnded = () => {

  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);

  useEffect(() => {
    console.log(currentPlayers);
  }, [])

  return (
    <div className="ended-game-container">

    </div>
  )
}

export default GameEnded;