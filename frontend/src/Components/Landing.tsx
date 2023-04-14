import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPlayer from './NewPlayer';
import ExistingPlayer from './ExistingPlayer';
import '../styling/Landing.scss';

interface LandingProps  {
  navigate: ReturnType<typeof useNavigate>;
}

const Landing: React.FC<LandingProps> = ({ navigate }) => {

  const [popup, setPopup] = useState(false);

  const handleNewPlayerPopup = () => {
    setPopup(!popup);
    document.body.classList.toggle('landing-container-gray');
  }

  return (
    <div>
    <h1>Welcome to Super Scrabble!</h1>
    <button onClick={handleNewPlayerPopup}>Register new player</button>
    {/* <button onClick={() => setPopup(2)}>Use exisitng player</button> */}
    {popup && <NewPlayer />}
    </div>
  )
}

export default Landing;