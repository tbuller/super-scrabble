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
    }
  }
})

export default squaresSlice.reducer;
export const { setSelectedSquareIndex, addPlayedSquare } = squaresSlice.actions;

export type RootStateSquares = {
  squares: SquaresState;
}