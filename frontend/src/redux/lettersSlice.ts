import { createSlice } from '@reduxjs/toolkit';

export type Letter = {
  letter: string;
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
    setLetters: (state, action) => {
      state.letters = action.payload;
    }
  }
})

export default lettersSlice.reducer;
export const { setLetters } = lettersSlice.actions;

export type RootState = {
  letters: LettersState;
}