import { createSlice } from '@reduxjs/toolkit';

export type GameState = {
  gameEnded: boolean;
}

const initialState: GameState = {
  gameEnded: false
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    endGame: (state, action) => {
      state.gameEnded = true;
    }
  }
})

export default gameSlice.reducer;
export const { endGame } = gameSlice.actions;

export type RootStateGame = {
  game: GameState;
}