import { useNavigate } from 'react-router-dom';
import React from 'react';

interface LandingProps  {
  navigate: ReturnType<typeof useNavigate>;
}

const Landing: React.FC<LandingProps> = ({ navigate }) => {

  return (
    <div className="landing-container">
    <h1>Welcome to the landing page</h1>
    <button>Register new player</button>
    <button>Use exisitng player</button>
    </div>
  )
}

export default Landing;