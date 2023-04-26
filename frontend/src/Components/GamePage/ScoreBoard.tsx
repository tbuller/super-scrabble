import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';

const ScoreBoard = () => {

  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);

  return (
    <div className="score-board-container">
    {currentPlayers && currentPlayers.map(p =>
      <div className="individual-player-container">
      <div>{p.username}</div>  
      <div>{p.currentScore}</div>
      </div>
      )} 
    </div>
  )
}

export default ScoreBoard;