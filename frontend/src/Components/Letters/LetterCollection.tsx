import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLetters, decrementLetterCount } from '../../redux/lettersSlice';
import { RootStateLetters } from '../../redux/lettersSlice';
import { addLetter } from '../../redux/usersSlice';
import { RootStateUsers } from '../../redux/usersSlice';
import Letter from './Letter';
import letterRepo from './letterRepo';

const LetterCollection = () => {

  const dispatch = useDispatch();
  const letters = useSelector((state: RootStateLetters) => state.letters.letters);
  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);
  const currentTurn = useSelector((state: RootStateUsers) => state.users.currentTurn); 

  const [myLetters, setMyLetters] = useState([]);

  useEffect(() => {
    dispatch(setLetters(letterRepo));
  }, [])

  const handleAddLetter = () => {
    const letterToAdd = getRandomLetter()

    dispatch(addLetter({ userId: currentTurn?._id, letter: letterToAdd }))

    console.log(currentPlayers[0].letters);
  }

  const getRandomLetter = () => {

    const totalCount = letters.reduce((total, item) => total + item.count, 0);

    let randomIndex = Math.floor(Math.random() * totalCount) + 1;

    for (let i = 0; i < letters.length; i++) {
      randomIndex -= letters[i].count;

      if (randomIndex <= 0) {
        dispatch(decrementLetterCount(letters[i].letter))
        return letters[i].letter;
      }
    }
  }

  const showLetters = () => {
    console.log(letters.length);
    console.log(currentTurn);
  }

  return (
    <div>
    <button onClick={showLetters}>show letters</button> 
    <button onClick={handleAddLetter}>random</button> 
    </div>
  )
}

export default LetterCollection;