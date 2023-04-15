import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  letters: []
}

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    setLetters: (state, action) => {
      state.letters = action.payload
    }
  }
})

export default lettersSlice.reducer;
export const { setLetters } = lettersSlice.actions;