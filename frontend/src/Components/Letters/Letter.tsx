import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateUsers } from '../../redux/usersSlice';
import { setSelectedLetter, setBadSelection, setSelectedLetterId } from '../../redux/lettersSlice'
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
  const selectedLetterId = useSelector((state: RootStateLetters) => state.letters.selectedLetterId)
  const badSelection = useSelector((state: RootStateLetters) => state.letters.badSelection);

  const [letterInfo, setLetterInfo] = useState<any>({});
  const [isLetterInfoSet, setIsLetterInfoSet] = useState(false);
  const [isLetterSelected, setIsLetterSelected] = useState(false);

  // useEffect(() => {
  //   if (!isLetterInfoSet) {
  //     const associatedInfo = letters.find(l => l.letter === letter);
  //     setLetterInfo(associatedInfo || {});
  //   }
  // }, [])

  // useEffect(() => {
  //   if (selectedLetterId) {
  //     setIsLetterSelected(true);
  //   }
  // }, [selectedLetterId])

  const handleLetterSelect = () => {
    if ((currentTurn && currentTurn._id) === associatedPlayer._id) {
      dispatch(setSelectedLetter(letter));
      // dispatch(setSelectedLetterId(uniqueId));
      console.log(selectedLetter);
      console.log(badSelection);
      // console.log(uniqueId);
      console.log(selectedLetterId);
    } else {
      console.log("Not this player's turn");
      // dispatch(setBadSelection(uniqueId));
    }
  }

  return (
    <div className={`individual-letter-container${isLetterSelected ? " selected" : badSelection ? " bad-selection" : ""}`} onClick={handleLetterSelect}>
    <div className="letter-character">{letter}</div>
    <div className="letter-value">{letterInfo.value}</div>
    </div>
  )
}

export default Letter;