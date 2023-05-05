import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';
import { updatePlayer } from '../../redux/usersSlice';
import { RootStateGame } from '../../redux/gameSlice';
import '../../styling/GameEnded.scss';

const GameEnded = () => {

  const dispatch = useDispatch();
  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);
  const gameEnded = useSelector((state: RootStateGame) => state.game.gameEnded);

  const [sortedResults, setSortedResults] = useState(currentPlayers);

  useEffect(() => {
    const sorted = [...currentPlayers].sort((a, b) => b.currentScore - a.currentScore);
    setSortedResults(sorted);
  }, [])

  useEffect(() => {
    if (gameEnded && sortedResults.length > 1) {
      sortedResults.map((player: any, index) => {
        let result = "L";
        if (index === 0) {
          result = "W";
        }
        fetch("http://localhost:8080/users", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: player._id, result: result })
        })
          .then(response => response.json())
          .then(data => {
            dispatch(updatePlayer(data.user));
          })
      })
    }
  }, [sortedResults])

  return (
    <div className="ended-game-container">
      <h1 className="ended-game-greeting">Game ended, thank you for playing</h1>
      {sortedResults && sortedResults.map((player: any, index) =>
        <span className="ended-individual-player-container" key={player._id}>
        <div className="player-poistion-ended">#{index + 1}</div>
        <div className="player-username-ended">{player.username}</div>  
        <div className="player-score-ended">{player.currentScore} points</div>
        </span>
        )}  
    </div>
  )
}

export default GameEnded;