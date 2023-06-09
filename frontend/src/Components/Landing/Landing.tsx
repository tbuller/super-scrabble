import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../redux/usersSlice';
import { RootStateUsers } from '../../redux/usersSlice';
import NewPlayer from './NewPlayer';
import ExistingPlayer from './ExistingPlayer';
import Players from './Players';
import '../../styling/Landing.scss';

interface LandingProps  {
  navigate: ReturnType<typeof useNavigate>;
}

const Landing: React.FC<LandingProps> = ({ navigate }) => {

  const dispatch = useDispatch();
  const users = useSelector((state: RootStateUsers) => state.users.users);
  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
      })
  }, [])

  useEffect(() => {
    setPopup(false);
    document.body.classList.remove('landing-container-gray');
  }, [users])

  const handleNewPlayerPopup = () => {
    setPopup(!popup);
    document.body.classList.toggle('landing-container-gray');
  }

  return (
    <div className="landing-page-container">
    <h1 className="landing-welcome">Welcome to Super Scrabble!</h1>
    <div className="buttons-container">
    <button className="new-player-button" onClick={handleNewPlayerPopup}>{popup ? "Close new player window" : "Create new player"}</button>
    {currentPlayers.length >= 2 && <button className="start-game-button" onClick={() => navigate("/play")}>Start game</button>}
    </div>
    <Players />
    {popup && <NewPlayer />}
    </div>
  )
}

export default Landing;