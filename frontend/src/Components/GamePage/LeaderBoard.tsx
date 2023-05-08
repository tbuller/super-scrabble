import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';
import '../../styling/LeaderBoard.scss';

const LeaderBoard = () => {

  const users = useSelector((state: RootStateUsers) => state.users.users);

  const [sortedUsers, setSortedUsers] = useState(users);

  const countWins = (results: string[]): number => {
    return results.reduce((count, result) => (result === 'W' ? count + 1 : count), 0);
  };

  const countLosses = (results: string[]): number => {
    return results.reduce((count, result) => (result === 'L' ? count + 1 : count), 0);
  }

  useEffect(() => {
    const sorted = [...users].sort((a, b) => countWins(b.results) - countWins(a.results));

    setSortedUsers(sorted);
  }, [])

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div>Rank</div>
        <div>Username</div>
        <div>Wins</div>
        <div>Losses</div>
        <div>Win Rate</div>
      </div>
      {sortedUsers.map((user, index) =>
        <span className="leaderboard-individual-user-container" key={user._id}>
          <div className="leaderboard-ranking">#{index + 1}</div>
          <div className="leaderboard-username">{user.username}</div>
          <div className="leaderboard-wins">{countWins(user.results)} wins</div>
          <div className="leaderboard-losses">{countLosses(user.results)} losses</div>
          <div className="leaderboard-win-rate">{((countWins(user.results) / user.results.length) * 100) || 0} %</div>
        </span>
        )}
    </div>
  )
}

export default LeaderBoard;