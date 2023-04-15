import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/usersSlice';
import '../../styling/Players.scss';

const Players = () => {

  const users = useSelector((state: RootState) => state.users.users);

  return (
    <div className="player-icon-container">
    {users.map(u => 
      <div className="player-icon">{u.username[0]}</div>
    )}  
    </div>
  )
}

export default Players;