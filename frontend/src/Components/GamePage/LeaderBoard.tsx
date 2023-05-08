import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';

const LeaderBoard = () => {

  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);

  const [sortedPlayers, setSortedPlayers] = useState(currentPlayers);

  const countWins = (results: string[]): number => {
    return results.reduce((count, result) => (result === 'W' ? count + 1 : count), 0);
  };

  const countLosses = (results: string[]): number => {
    return results.reduce((count, result) => (result === 'L' ? count + 1 : count), 0);
  }

  useEffect(() => {
    const sorted = currentPlayers.sort((a, b) => countWins(b.results) - countWins(a.results));

    setSortedPlayers(sorted);
  }, [])

  return (
    <div className="leaderboard-container">
      {sortedPlayers.map((player, index) =>
        <span className="leaderboard-individual-player-container">
          <div className="leaderboard-ranking">#{index + 1}</div>
          <div className="leaderboard-username">{player.username}</div>
          <div className="leaderboard-wins">{countWins(player.results)} wins</div>
          <div className="leaderboard-losses">{countLosses(player.results)} losses</div>
          <div className="leaderboard-win-rate">{(countWins(player.results) / player.results.length) * 100} %</div>
        </span>
        )}
    </div>
  )
}

export default LeaderBoard;