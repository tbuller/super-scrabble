import React from 'react';
import '../styling/NewPlayer.scss';

const NewPlayer = () => {

  return (
    <div className="new-player-container">
    <h2>New player</h2>
    <label className="new-player-label">Please choose a username:</label>
    <input className="new-player-username" type="text" />
    <label className="new-player-label">Please choose a password:</label>
    <input className="new-player-password" type="password" />
    <label className="new-player-label">Please confirm your password:</label>
    <input className="new-player-password" type="password" />
    </div>
  )
}

export default NewPlayer;