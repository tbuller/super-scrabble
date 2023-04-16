import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLetters, decrementLetterCount } from '../../redux/lettersSlice';
import { RootStateLetters } from '../../redux/lettersSlice';
import { RootStateUsers } from '../../redux/usersSlice';
import Letter from './Letter';
import letterRepo from './letterRepo';

const LetterCollection = () => {

  const dispatch = useDispatch();
  const letters = useSelector((state: RootStateLetters) => state.letters.letters);
  const currentTurn = useSelector((state: RootStateUsers) => state.users.currentTurn); 

  const [myLetters, setMyLetters] = useState([]);

  useEffect(() => {
    dispatch(setLetters(letterRepo));
  }, [])

  const getRandomLetter = () => {

    const totalCount = letters.reduce((total, item) => total + item.count, 0);

    let randomIndex = Math.floor(Math.random() * totalCount) + 1;

    for (let i = 0; i < letters.length; i++) {
      randomIndex -= letters[i].count;

      if (randomIndex <= 0) {
        dispatch(decrementLetterCount(letters[i].letter))
        console.log(letters[i].letter);
        break;
        // return letters[i].letter;
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
    <button onClick={getRandomLetter}>random</button> 
    </div>
  )
}

export default LetterCollection;