import { createSlice } from '@reduxjs/toolkit';

type Word = {
  word: string;
}

type WordsState = {
  words: Word[];
  currentWord: ""
}

const initialState: WordsState = {
  words: [],
  currentWord: ""
}

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    addWord: (state, action) => {
      state.words.push(action.payload);
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    }
  }
})

export default wordsSlice.reducer;
export const { addWord, setCurrentWord } = wordsSlice.actions;