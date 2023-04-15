import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLetters } from '../../redux/lettersSlice';
import { RootState } from '../../redux/lettersSlice';
import letterRepo from './letterRepo';

const LetterCollection = () => {

  const dispatch = useDispatch();
  const letters = useSelector((state: RootState) => state.letters.letters);

  useEffect(() => {
    dispatch(setLetters(letterRepo));
  }, [])

  const showLetters = () => {
    console.log(letters);
  }

  return (
    <div></div>
  )
}

export default LetterCollection;