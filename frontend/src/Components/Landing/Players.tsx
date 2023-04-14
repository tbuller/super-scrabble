import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/usersSlice';

const Players = () => {

  const users = useSelector((state: RootState) => state.users.users);

  return (
    <div>
    {users.map(u => 
      <div>{u.username[0]}</div>
    )}  
    </div>
  )
}

export default Players;