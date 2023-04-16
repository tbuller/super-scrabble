import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Letter = {
  letter: string;
  value: number;
  count: number;
}

type LettersState = {
  letters: Letter[];
}

const initialState: LettersState = {
  letters: []
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
    }
  }
})

export default lettersSlice.reducer;
export const { setLetters, decrementLetterCount } = lettersSlice.actions;

export type RootStateLetters = {
  letters: LettersState;
}