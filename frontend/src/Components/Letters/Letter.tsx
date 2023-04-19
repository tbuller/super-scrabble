import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';
import { setSelectedLetter } from '../../redux/lettersSlice'
import { RootStateLetters } from '../../redux/lettersSlice';
import '../../styling/Letter.scss';

interface LetterProps {
  letter: any;
  associatedPlayer: any;
}

const Letter = ({ letter, associatedPlayer }: LetterProps) => {

  const dispatch = useDispatch();
  const currentTurn = useSelector((state: RootStateUsers) => state.users.currentTurn);
  const letters = useSelector((state: RootStateLetters) => state.letters.letters);
  const selectedLetter = useSelector((state: RootStateLetters) => state.letters.selectedLetter);

  const [letterInfo, setLetterInfo] = useState<any>({});
  const [badSelection, setBadSelection] = useState(false);

  useEffect(() => {
    const associatedInfo = letters.find(l => l.letter === letter);
    setLetterInfo(associatedInfo || {});
  }, [])

  const handleLetterSelect = () => {
    if ((currentTurn && currentTurn._id) === associatedPlayer._id) {
      dispatch(setSelectedLetter(letterInfo));
      console.log(selectedLetter);
    } else {
      console.log("Not this player's turn");
      setBadSelection(true);
    }
  }

  return (
    <div className={`individual-letter-container${badSelection ? "-bad-selection" : ""}`} onClick={handleLetterSelect}>
    <div className="letter-character">{letter}</div>
    <div className="letter-value">{letterInfo.value}</div>
    </div>
  )
}

export default Letter;