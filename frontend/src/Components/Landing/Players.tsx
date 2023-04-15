import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, RootState } from '../../redux/usersSlice';
import { addCurrentPlayer } from '../../redux/usersSlice';
import '../../styling/Players.scss';

const Players = () => {

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const currentPlayers = useSelector((state: RootState) => state.users.currentPlayers);

  const addPlayer = (player: User) => {
    dispatch(addCurrentPlayer(player));
  }

  return (
    <div className="player-icon-container">
    {users.map(u => 
      <div className={`player-icon${currentPlayers.includes(u) ? '-selected' : ''}`} key={u._id} onClick={() => addPlayer(u)}>{u.username[0]}</div>
    )}  
    </div>
  )
}

export default Players;