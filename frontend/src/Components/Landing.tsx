import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPlayer from './NewPlayer';
import ExistingPlayer from './ExistingPlayer';

interface LandingProps  {
  navigate: ReturnType<typeof useNavigate>;
}

const Landing: React.FC<LandingProps> = ({ navigate }) => {

  const [popup, setPopup] = useState(0);

  return (
    <div className="landing-container">
    <h1>Welcome to Super Scrabble!</h1>
    <button onClick={() => setPopup(1)}>Register new player</button>
    <button onClick={() => setPopup(2)}>Use exisitng player</button>
    {popup === 1 && <NewPlayer />}
    {popup === 2 && <ExistingPlayer />}
    </div>
  )
}

export default Landing;