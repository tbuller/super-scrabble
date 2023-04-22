import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCommentRange } from 'typescript';
import { Letter } from './lettersSlice';

type LetterWithUniqueId = {
  letter: string;
  value: number;
  count: number;
  uniqueId: string;
}

export type User = {
  _id: string;
  username: string;
  password: string;
  letters: LetterWithUniqueId[];
  currentScore: number;
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
    },
    addInitialPlayerLetters: (state, action) => {
      const relevantUser = state.currentPlayers.find(p => p._id === action.payload.userId);
      if (relevantUser) {
        relevantUser.letters = action.payload.letters;        
      }
    },
    addLetter: (state, action) => {
      const relevantUser = state.currentPlayers.find(p => p._id === action.payload.userId);

      if (relevantUser) {
        if (!relevantUser.letters) {
          relevantUser.letters = [];
        }
        relevantUser.letters.push(action.payload.letter);
      }
    },
    removeLetter: (state, action) => {
      const relevantUser = state.currentPlayers.find(p => {
        p.letters.some(l => l.uniqueId === action.payload.uniqueId)
      });

      if (relevantUser) {
        relevantUser.letters = relevantUser.letters.filter(l => l.uniqueId !== action.payload.uniqueId);
      }
    }
  }
})

export default usersSlice.reducer;
export const { setUsers, addUser, addCurrentPlayer, setInitialTurn, setNextTurn, addInitialPlayerLetters, addLetter, removeLetter } = usersSlice.actions;

export type RootStateUsers = {
  users: UsersState;
}