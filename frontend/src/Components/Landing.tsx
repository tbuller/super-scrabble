import { useNavigate } from 'react-router-dom';
import React from 'react';

interface LandingProps  {
  navigate: ReturnType<typeof useNavigate>;
}

const Landing: React.FC<LandingProps> = ({ navigate }) => {

  return (
    <div>Welcome to the landing page</div>
  )
}

export default Landing;