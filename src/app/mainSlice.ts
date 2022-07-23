import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../db/firebase";

export const asyncFetchInitialData = createAsyncThunk(
  "users/asyncFetchInitialData",
  async (userId: string) => {
    const boxesData = await getDocs(collection(db, "users", userId, "boxes"));
    const decksData = await getDocs(collection(db, "users", userId, "decks"));

    let boxesArr: BoxObj[] = [];
    if (!boxesData.empty) {
      boxesData.forEach((doc) => {
        // FIXME: test
        const updatedDoc: BoxObj = {
          boxName: doc.data().boxName,
          cardsInBox: [],
        };

        boxesArr.push(updatedDoc);
      });
    }

    let decksArr: DeckObj[] = [];
    if (!decksData.empty) {
      decksData.forEach((doc) => {
        const updatedDoc: DeckObj = {
          deckName: doc.data().deckName,
          cardsInDeck: [],
        };

        decksArr.push(updatedDoc);
      });
    }

    return {
      boxesArr,
      decksArr,
    };
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
  boxes: BoxObj[];
  decks: DeckObj[];
}

const initialState: MainState = {
  userId: "",
  isAuth: false,
  isLoading: true,
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
      state.boxes = [];
      state.decks = [];
    },
    addBox: (state, action: PayloadAction<string>) => {
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
      state.boxes = action.payload.boxesArr;
      state.decks = action.payload.decksArr;
      state.isLoading = false;
    });
  },
});

export const { authenticate, logout, addBox, addDeck, addCard } =
  mainSlice.actions;
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
