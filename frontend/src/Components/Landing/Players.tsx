import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, RootStateUsers } from '../../redux/usersSlice';
import { addCurrentPlayer } from '../../redux/usersSlice';
import '../../styling/Players.scss';

const Players = () => {

  const dispatch = useDispatch();
  const users = useSelector((state: RootStateUsers) => state.users.users);
  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);

  const addPlayer = (player: User) => {
    dispatch(addCurrentPlayer(player));
  }

  // const showPlayers = () => {
  //   console.log(currentPlayers);
  // }

  return (
    <div className="players-icons-container">
    {users.map(u =>
      <div className="player-icon-container" key={u._id}>
      <div className={`player-icon${currentPlayers.find(p => p._id === u._id) ? ' selected' : ''}`} key={u._id} onClick={() => addPlayer(u)}>
        {u.username[0].toUpperCase()}
        <div className="popup">{u.username}</div>
      </div>
      </div>
    )}  
    </div>
  )
}

export default Players;