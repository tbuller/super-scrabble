import React from 'react'
import { useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';
import { AiOutlineArrowDown } from 'react-icons/ai';
import '../../styling/CurrentPlayers.scss';

const CurrentPlayers = () => {

  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);
  const currentTurn = useSelector((state: RootStateUsers) => state.users.currentTurn);

  return (
    <div className="current-players-container">
      {currentPlayers.map(p =>
        <div className="individual-current-player-conatainer" key={p._id}>
        {p._id === currentTurn?._id && <AiOutlineArrowDown className="turn-indicator-arrow" />} 
        <div className="current-player-icon" key={p._id}>{p.username[0].toUpperCase()}</div>
        </div>
        )}
    </div>
  )
}

export default CurrentPlayers;