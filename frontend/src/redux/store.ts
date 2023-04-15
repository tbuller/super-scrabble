import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import lettersReducer from './lettersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    letters: lettersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
