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
      state.currentPlayers.push({...action.payload, currentScore: 0});
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
        console.log(action.payload.letter);
        relevantUser.letters.push(action.payload.letter);
      }
    },
    removeLetter: (state, action) => {
      state.currentPlayers.forEach((player, playerIndex) => {
        const letterIndex = player.letters.findIndex(letter => letter.uniqueId === action.payload.uniqueId);
    
        if (letterIndex !== -1) {
          state.currentPlayers[playerIndex].letters.splice(letterIndex, 1);
          return;
        }
      })
    },
    addPlayerScore: (state, action) => {
      const relevantPlayer = state.currentPlayers.find(p => p._id === action.payload.userId);
      console.log(relevantPlayer);
      console.log(action.payload);
      if (relevantPlayer) {
        relevantPlayer.currentScore += action.payload.points;
      }
    }    
  }
})

export default usersSlice.reducer;
export const { setUsers, addUser, addCurrentPlayer, setInitialTurn, setNextTurn, addInitialPlayerLetters, addLetter, removeLetter, addPlayerScore } = usersSlice.actions;

export type RootStateUsers = {
  users: UsersState;
}