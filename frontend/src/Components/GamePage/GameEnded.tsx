import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';

const GameEnded = () => {

  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);

  const [sortedResults, setSortedResults] = useState(currentPlayers);

  useEffect(() => {
    const sorted = [...currentPlayers].sort((a, b) => b.currentScore - a.currentScore);
    setSortedResults(sorted);
  }, [])

  return (
    <div className="ended-game-container">
      <h1 className="ended-game-greeting">Game ended, thank you for playing</h1>
      {sortedResults && sortedResults.map((player: any, index) =>
        <div>#{index + 1}</div>  
        )}  
    </div>
  )
}

export default GameEnded;