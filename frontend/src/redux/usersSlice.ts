import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  _id: string;
  username: string;
  password: string;
}

type UsersState = {
  users: User[];
  currentPlayers: User[];
}

const initialState: UsersState = {
  users: [],
  currentPlayers: []
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
    }
  }
})

export default usersSlice.reducer;
export const { setUsers, addUser, addCurrentPlayer } = usersSlice.actions;

export type RootState = {
  users: UsersState;
}