import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLetter } from '../../redux/lettersSlice'
import { RootStateLetters } from '../../redux/lettersSlice';
import '../../styling/Letter.scss';

interface LetterProps {
  letter: any;
}

const Letter = ({ letter }: LetterProps) => {

  const dispatch = useDispatch();
  const letters = useSelector((state: RootStateLetters) => state.letters.letters);
  const selectedLetter = useSelector((state: RootStateLetters) => state.letters.selectedLetter);

  const [letterInfo, setLetterInfo] = useState<any>({});

  useEffect(() => {
    const associatedInfo = letters.find(l => l.letter === letter);
    setLetterInfo(associatedInfo || {});
  }, [])

  const handleLetterSelect = () => {
    dispatch(setSelectedLetter(letterInfo));
    console.log(selectedLetter);
  }

  return (
    <div className="individual-letter-container" onClick={handleLetterSelect}>
    <div className="letter-character">{letter}</div>
    <div className="letter-value">{letterInfo.value}</div>
    </div>
  )
}

export default Letter;