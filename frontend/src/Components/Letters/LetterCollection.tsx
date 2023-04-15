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

  const showLetters = () => {
    console.log(letters);
  }

  return (
    <div>
    <button onClick={showLetters}>show letters</button>  
    </div>
  )
}

export default LetterCollection;