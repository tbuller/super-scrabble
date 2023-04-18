import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateLetters } from '../../redux/lettersSlice';
import '../../styling/Letter.scss';

interface LetterProps {
  letter: string;
}

const Letter = ({ letter }: LetterProps) => {

  const dispatch = useDispatch();
  const letters = useSelector((state: RootStateLetters) => state.letters.letters);

  const [letterInfo, setLetterInfo] = useState({});

  useEffect(() => {
    console.log(letter);
    console.log(letters);
    const associatedInfo = letters.find(l => l.letter === letter);
    console.log(associatedInfo);
    setLetterInfo(associatedInfo || {});
  }, [])

  return (
    <div className="individual-letter-container" onClick={() => console.log(letterInfo)}>
    <div className="letter-charcater"></div>
    <div className="letter-value"></div>
    </div>
  )
}

export default Letter;