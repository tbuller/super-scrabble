import React from 'react';
import '../styling/NewPlayer.scss';

const NewPlayer = () => {

  return (
    <div className="new-player-container">
    <h2>New player</h2>
    <div className="line-container">
    <label className="new-player-label">Please choose a username:</label>
    <input className="new-player-username" type="text" />
    </div>
    <div className="line-container">
    <label className="new-player-label">Please choose a password:</label>
    <input className="new-player-password" type="password" />
    </div>
    <div className="line-container">
    <label className="new-player-label">Please confirm your password:</label>
    <input className="new-player-password" type="password" />
    </div>
    </div>
  )
}

export default NewPlayer;