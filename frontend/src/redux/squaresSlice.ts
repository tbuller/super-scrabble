import { createSlice } from '@reduxjs/toolkit';

type SquaresState = {
  selectedSquareIndex: any;
  playedSquaresIndicesLetter: any;
}

const initialState: SquaresState = {
  selectedSquareIndex: null,
  playedSquaresIndicesLetter: []
}

const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    setSelectedSquareIndex: (state, action) => {
      state.selectedSquareIndex = action.payload;
    },
    addPlayedSquare: (state, action) => {
      state.playedSquaresIndicesLetter.push(action.payload);
      console.log(state.playedSquaresIndicesLetter);
    },
    removeBadWord: (state, action) => {
      const badUniqueIds = action.payload.map((l: any) => l.uniqueId);

      state.playedSquaresIndicesLetter.filter((letter: any) => !(badUniqueIds.includes(letter.letter.uniqueId)));
    }
  }
})

export default squaresSlice.reducer;
export const { setSelectedSquareIndex, addPlayedSquare, removeBadWord } = squaresSlice.actions;

export type RootStateSquares = {
  squares: SquaresState;
}