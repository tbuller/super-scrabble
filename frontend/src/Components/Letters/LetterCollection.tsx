import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLetters } from '../../redux/lettersSlice';
import { RootState } from '../../redux/lettersSlice';
import Letter from './Letter';
import letterRepo from './letterRepo';

const LetterCollection = () => {

  const dispatch = useDispatch();
  const letters = useSelector((state: RootState) => state.letters.letters);

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
        letters[i].count -= 1;
        console.log(letters[i].letter);
        // return letters[i].letter;
      }
    }
  }

  const showLetters = () => {
    console.log(letters.length);
  }

  return (
    <div>
    <button onClick={showLetters}>show letters</button>  
    </div>
  )
}

export default LetterCollection;