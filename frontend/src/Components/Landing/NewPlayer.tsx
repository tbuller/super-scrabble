import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/usersSlice';
import '../../styling/NewPlayer.scss';

const NewPlayer = () => {

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [notMatching, setNotMatching] = useState(false);

  const createUser = () => {
    if (confirmedPassword !== password) {
      setNotMatching(true);
    } else {
      fetch("http://localhost:8080/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => response.json())
        .then(data => {
          dispatch(addUser(data.user));
        })
        
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
    <button onClick={createUser}>Add player</button>
    {notMatching && <div className="non-matching-passwords-prompt">Make sure you are entering the same password in both fields</div>}
    </div>
  )
}

export default NewPlayer;