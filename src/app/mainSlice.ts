import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../db/firebase";

export const asyncFetchInitialData = createAsyncThunk(
  "users/asyncFetchInitialData",
  async (userId: string) => {
    const response = await getDocs(collection(db, "users", userId, "boxes"));

    let docsArray: string[] = [];
    if (!response.empty) {
      response.forEach((doc) => {
        docsArray.push(doc.data().name);
      });
    }

    return docsArray!;
  }
);

interface CardObj {
  deckId: string;
  question: string;
  answer: string;
}

interface DeckObj {
  deckName: string;
  cardsInDeck: CardObj[];
}

interface BoxObj {
  boxName: string;
  cardsInBox: CardObj[];
}

interface MainState {
  userId: string;
  isAuth: boolean;
  isLoading: boolean;
  boxData: string[];
  boxes: BoxObj[];
  decks: DeckObj[];
}

const initialState: MainState = {
  userId: "",
  isAuth: false,
  isLoading: true,
  boxData: [],
  boxes: [],
  decks: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.userId = "";
      state.isAuth = false;
      state.boxData = [];
    },
    addBox: (state, action: PayloadAction<string>) => {
      state.boxData.push(action.payload);
      state.boxes.push({
        boxName: action.payload,
        cardsInBox: [],
      });
    },
    addDeck: (state, action: PayloadAction<string>) => {
      state.decks.push({
        deckName: action.payload,
        cardsInDeck: [],
      });
    },
    addCard: (state, action: PayloadAction<CardObj>) => {
      const cardToAdd = {
        deckId: action.payload.deckId,
        question: action.payload.question,
        answer: action.payload.answer,
      };
      const deckObj = state.decks.find(
        (deck) => deck.deckName === action.payload.deckId
      );

      deckObj?.cardsInDeck.push(cardToAdd);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncFetchInitialData.fulfilled, (state, action) => {
      state.boxData = action.payload;
      state.isLoading = false;
    });
  },
});

export const { authenticate, logout, addBox } = mainSlice.actions;
export default mainSlice.reducer;

/**
 * Reducers:
 *
 * authenticate,
 * logout,
 * setData,
 * resetData,
 * openeditor("box", "deck", "card")
 * manageBoxes("add", "delete", {data})
 * manageDecks("add", "delete", {data})
 * manageCards("add", "delete", {data})
 * shiftUpCard,
 * shiftDownCard
 *
 */
