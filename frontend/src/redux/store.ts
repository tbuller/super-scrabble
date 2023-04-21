import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import lettersReducer from './lettersSlice';
import squaresReducer from './squaresSlice';
import wordsReducer from './wordsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    letters: lettersReducer,
    words: wordsReducer,
    squares: squaresReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
