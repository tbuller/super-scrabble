import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../redux/usersSlice';
import { RootState } from '../../redux/usersSlice';
import NewPlayer from './NewPlayer';
import ExistingPlayer from './ExistingPlayer';
import Players from './Players';
import '../../styling/Landing.scss';

interface LandingProps  {
  navigate: ReturnType<typeof useNavigate>;
}

const Landing: React.FC<LandingProps> = ({ navigate }) => {

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

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
    <div>
    <h1>Welcome to Super Scrabble!</h1>
    <button onClick={handleNewPlayerPopup}>{popup ? "Close new player window" : "Create new player"}</button>
    {/* <button onClick={() => setPopup(2)}>Use exisitng player</button> */}
    <Players />
    {popup && <NewPlayer />}
    </div>
  )
}

export default Landing;