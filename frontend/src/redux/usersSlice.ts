import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  username: string;
  password: string;
}

type UsersState = {
  users: User[];
}

const initialState = {
  users: []
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
    }
  }
})

export default usersSlice.reducer;
export const { setUsers, addUser } = usersSlice.actions;