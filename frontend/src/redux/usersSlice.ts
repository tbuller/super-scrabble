import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  _id: string;
  username: string;
  password: string;
}

type UsersState = {
  users: User[];
  currentPlayers: User[];
  currentTurn: User | null;
}

const initialState: UsersState = {
  users: [],
  currentPlayers: [],
  currentTurn: null
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    addCurrentPlayer: (state, action: PayloadAction<User>) => {
      state.currentPlayers.push(action.payload);
    },
    setInitialTurn: (state, action) => {
      state.currentTurn = action.payload;
    },
    setNextTurn: (state, action) => {
      state.currentTurn = action.payload;
    }
  }
})

export default usersSlice.reducer;
export const { setUsers, addUser, addCurrentPlayer, setInitialTurn, setNextTurn } = usersSlice.actions;

export type RootStateUsers = {
  users: UsersState;
}