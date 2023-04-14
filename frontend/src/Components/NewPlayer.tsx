import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import '../styling/NewPlayer.scss';

const NewPlayer = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const addUser = () => {
    if (confirmedPassword !== password) {
      return;
    } else {
      fetch("http://localhost:8080/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => response.json())
        .then(data => console.log(data))
    }
  }

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleConfirmedPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(event.target.value);
  }

  return (
    <div className="new-player-container">
    <h2>New player</h2>
    <div className="line-container">
    <label className="new-player-label">Please choose a username:</label>
    <input className="new-player-username" type="text" onChange={handleUsername} />
    </div>
    <div className="line-container">
    <label className="new-player-label">Please choose a password:</label>
    <input className="new-player-password" type="password" onChange={handlePassword} />
    </div>
    <div className="line-container">
    <label className="new-player-label">Please confirm your password:</label>
    <input className="new-player-password" type="password" onChange={handleConfirmedPassword} />
    </div>
    <button onClick={addUser}>Add player</button>
    </div>
  )
}

export default NewPlayer;