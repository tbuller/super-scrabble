import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';
import '../../styling/ScoreBoard.scss';

const ScoreBoard = () => {

  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);
  const currentTurn = useSelector((state: RootStateUsers) => state.users.currentTurn);

  return (
    <div className="score-board-container">
    {currentPlayers && currentPlayers.map(p =>
      <div className={`individual-player-container${p._id === currentTurn?._id ? " selected" : ""}`} key={p._id}>
      <div className="score-board-username">{p.username}</div>  
      <div className="score-board-current-score">{p.currentScore}</div>
      </div>
      )} 
    </div>
  )
}

export default ScoreBoard;