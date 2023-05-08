import React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { User, RootStateUsers } from '../../redux/usersSlice';
import { addCurrentPlayer, removeCurrentPlater } from '../../redux/usersSlice';
import LeaderBoard from '../GamePage/LeaderBoard';
import '../../styling/Players.scss';

const Players = () => {

  const dispatch = useDispatch();
  const users = useSelector((state: RootStateUsers) => state.users.users);
  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);

  const [showLeaderBoard, setShowLeaderBoard] = useState(false);

  const addPlayer = (player: User) => {
    if (currentPlayers.find(p => p._id === player._id)) {
      dispatch(removeCurrentPlater(player));
    } else {
      dispatch(addCurrentPlayer(player));
    }
  }

  return (
    <div className="players-page-container">
      <button className="show-leaderboard-button" onClick={() => setShowLeaderBoard(!showLeaderBoard)}>{showLeaderBoard ? "Player Selection" : "Leader Board"}</button>
      {showLeaderBoard && <LeaderBoard />}
    {!showLeaderBoard && 
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
    }
    </div>
  )
}

export default Players;