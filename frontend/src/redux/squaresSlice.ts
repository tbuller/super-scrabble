import { createSlice } from '@reduxjs/toolkit';

type SquaresState = {
  selectedSquareIndex: any;
}

const initialState: SquaresState = {
  selectedSquareIndex: null
}

const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    setSelectedSquareIndex: (state, action) => {
      state.selectedSquareIndex = action.payload;
    }
  }
})

export default squaresSlice.reducer;
export const { setSelectedSquareIndex } = squaresSlice.actions;

export type RootStateSquares = {
  squares: SquaresState;
}