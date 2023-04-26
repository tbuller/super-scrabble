import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';
import { setSelectedLetter, unsetSelectedLetter, setBadSelection, unsetBadSelection } from '../../redux/lettersSlice'
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
  const badSelection = useSelector((state: RootStateLetters) => state.letters.badSelection);

  const [letterInfo, setLetterInfo] = useState<any>({});
  const [isLetterInfoSet, setIsLetterInfoSet] = useState(false);
  const [isLetterSelected, setIsLetterSelected] = useState(false);

  const handleLetterSelect = () => {
    if ((currentTurn && currentTurn._id) === associatedPlayer._id) {
      dispatch(setSelectedLetter(letter));
      dispatch(unsetBadSelection({}));
      console.log(selectedLetter);
      console.log(badSelection);
      console.log(letter.uniqueId);
    } else {
      console.log("Not this player's turn");
      dispatch(setBadSelection(letter));
      dispatch(unsetSelectedLetter({}));
    }
  }

  return (
    <div className={`individual-letter-container${selectedLetter.uniqueId === letter.uniqueId ? " selected" : badSelection.uniqueId === letter.uniqueId ? " bad-selection" : ""}`} onClick={handleLetterSelect}>
    <div className="letter-character">{letter.letter}</div>
    <div className="letter-value">{letter.value}</div>
    </div>
  )
}

export default Letter;