import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Letter from '../Components/Letters/Letter';

export type Letter = {
  letter: string;
  value: number;
  count: number;
}

type LettersState = {
  letters: Letter[];
  selectedLetter: any;
  badSelection: any;
  justPlayed: any;
}

const initialState: LettersState = {
  letters: [],
  selectedLetter: {},
  badSelection: "",
  justPlayed: []
}

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    setLetters: (state, action: PayloadAction<Letter[]>) => {
      state.letters = action.payload;
    },
    decrementLetterCount: (state, action: PayloadAction<string>) => {
      const letter = state.letters.find(item => item.letter === action.payload);
      if (letter) {
        letter.count -= 1;
      }
    },
    setSelectedLetter: (state, action: PayloadAction<Letter>) => {
      state.selectedLetter = action.payload;
    },
    unsetSelectedLetter: (state, action) => {
      state.selectedLetter = action.payload;
    },
    setBadSelection: (state, action: PayloadAction<Letter>) => {
      state.badSelection = action.payload;
    },
    unsetBadSelection: (state, action) => {
      state.badSelection = action.payload;
    },
    addJustPlayed: (state, action) => {
      state.justPlayed.push(action.payload);
    },
    emptyJustPlayed: (state, action) => {
      state.justPlayed = [];
    }
  }
})

export default lettersSlice.reducer;
export const { setLetters, decrementLetterCount, setSelectedLetter, unsetSelectedLetter, setBadSelection, unsetBadSelection, addJustPlayed, emptyJustPlayed } = lettersSlice.actions;

export type RootStateLetters = {
  letters: LettersState;
}