import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLetters, decrementLetterCount } from '../../redux/lettersSlice';
import { RootStateLetters } from '../../redux/lettersSlice';
import { addLetter, addInitialPlayerLetters } from '../../redux/usersSlice';
import { RootStateUsers, User } from '../../redux/usersSlice';
import Letter from './Letter';
import letterRepo from './letterRepo';

const LetterCollection = () => {

  type Letter = {
    letter: string;
    value: number;
    count: number;
  }

  const dispatch = useDispatch();
  const letters = useSelector((state: RootStateLetters) => state.letters.letters);
  const currentPlayers = useSelector((state: RootStateUsers) => state.users.currentPlayers);
  const currentTurn = useSelector((state: RootStateUsers) => state.users.currentTurn); 

  const [initialLetters, setInitialLetters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLettersLoaded, setInitialLettersLoaded] = useState(false);
  const [initialLettersAdded, setInitialLettersAdded] = useState(false)

  useEffect(() => {
    dispatch(setLetters(letterRepo));
    setLoading(false);
  }, [])

  useEffect(() => {
    if (letters.length > 0 && currentPlayers) {
      const numLettersToAdd = currentPlayers.length * 7;
      let newInitialLetters: string[] = [];
      
      for (let i = 0; i < numLettersToAdd; i++) {
        const letterToAdd = getRandomLetter(letters);
        newInitialLetters.push(letterToAdd);
      }

      setInitialLetters(newInitialLetters);
      setInitialLettersLoaded(true);
    } else {
      console.log("letters and or players aren't ready yet");
    }
  }, [loading])

  useEffect(() => {
    if (initialLetters.length > 0 && initialLettersLoaded && !initialLettersAdded) {
      setInitialLettersAdded(true);

      currentPlayers.forEach((p, i) => {
        const start = i * 7;
        const end = start + 7;
        const playerInitialLetters = initialLetters.slice(start, end);
        console.log(playerInitialLetters);
        dispatch(addInitialPlayerLetters({ userId: p._id, letters: playerInitialLetters }))
      })
    }
  }, [initialLettersLoaded])

  console.log("component rendered");

  const handleAddLetter = (userId: string, letters: Letter[]) => {
    const letterToAdd = getRandomLetter(letters);

    dispatch(addLetter({ userId: userId, letter: letterToAdd }));

    console.log(currentPlayers[0].letters);
    console.log(currentPlayers[1].letters);
    console.log(letterToAdd);
  }

  const getRandomLetter = (letters: Letter[]) => {

    const totalCount = letters.reduce((total, item) => total + item.count, 0);

    let randomIndex = Math.floor(Math.random() * totalCount) + 1;

    for (let i = 0; i < letters.length; i++) {
      randomIndex -= letters[i].count;

      if (randomIndex <= 0) {
        dispatch(decrementLetterCount(letters[i].letter))
        return letters[i].letter;
      }
    }

    const remainingLetters = letters.filter(letter => letter.count > 0);
    const randomLetterIndex = Math.floor(Math.random() * remainingLetters.length);
    const randomLetter = remainingLetters[randomLetterIndex]?.letter;
    dispatch(decrementLetterCount(randomLetter));
    return randomLetter;
  }

  const showLetters = () => {
    let totalCount = 0;
    letters.forEach(l => totalCount += l.count);
    console.log(totalCount);
    console.log(currentTurn);
    console.log(initialLetters);
    console.log(currentPlayers[0].letters);
    console.log(currentPlayers[1].letters);
    {currentPlayers[2] && console.log(currentPlayers[2].letters)};
    {currentPlayers[3] && console.log(currentPlayers[3].letters)};
  }

  return (
    <div>
    <button onClick={showLetters}>show letters</button> 
    <button onClick={() => handleAddLetter(currentPlayers[0]._id, letters)}>random</button> 
    </div>
  )
}

export default LetterCollection;