import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import lettersReducer from './lettersSlice';
import squaresReducer from './squaresSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    letters: lettersReducer,
    squares: squaresReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
