import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../db/firebase";

type Flashcard = {
  question: string;
  answer: string;
  comment: string;
  from: string;
  currBox: string;
};

interface DeckObj {
  deckName: string;
  deckId: string;
}

interface BoxObj {
  boxName: string;
  boxId: string;
}

interface MainState {
  userId: string;
  isAuth: boolean;
  isLoading: boolean;
  allBoxes: Array<BoxObj>;
  allDecks: Array<DeckObj>;
  allCards: Array<Flashcard>;
}

export const asyncFetchInitialData = createAsyncThunk(
  "users/asyncFetchInitialData",
  async (userId: string) => {
    const boxesData = await getDocs(collection(db, "users", userId, "boxes"));
    const decksData = await getDocs(collection(db, "users", userId, "decks"));
    const cardsData = await getDocs(collection(db, "users", userId, "cards"));

    let boxesArr: BoxObj[] = [];
    let decksArr: DeckObj[] = [];
    let cardsArr: Flashcard[] = [];

    if (!boxesData.empty) {
      boxesData.forEach((doc) => {
        const updatedDoc: BoxObj = {
          boxName: doc.data().boxName,
          boxId: doc.data().boxId,
        };

        boxesArr.push(updatedDoc);
      });
    }

    if (!decksData.empty) {
      decksData.forEach((doc) => {
        const updatedDoc: DeckObj = {
          deckName: doc.data().deckName,
          deckId: doc.data().deckId,
        };

        decksArr.push(updatedDoc);
      });
    }

    if (!cardsData.empty) {
      cardsData.forEach((doc) => {
        const updatedDoc: Flashcard = {
          question: doc.data().question,
          answer: doc.data().answer,
          comment: doc.data().comment,
          from: doc.data().from,
          currBox: doc.data().currBox,
        };

        cardsArr.push(updatedDoc);
      });
    }

    return {
      boxesArr,
      decksArr,
      cardsArr,
    };
  }
);

const initialState: MainState = {
  userId: "",
  isAuth: false,
  isLoading: true,
  allBoxes: [],
  allDecks: [],
  allCards: [],
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
      state.allBoxes = [];
      state.allDecks = [];
    },
    addBox: (state, action: PayloadAction<string>) => {
      state.allBoxes.push({
        boxName: action.payload,
        boxId: action.payload.toLowerCase().replace(/\s/g, ""),
      });
    },
    addDeck: (state, action: PayloadAction<string>) => {
      state.allDecks.push({
        deckName: action.payload,
        deckId: action.payload.toLowerCase().replace(/\s/g, ""),
      });
    },
    addCard: (state, action: PayloadAction<Flashcard>) => {
      state.allCards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncFetchInitialData.fulfilled, (state, action) => {
      state.allBoxes = action.payload.boxesArr;
      state.allDecks = action.payload.decksArr;
      state.allCards = action.payload.cardsArr;
      state.isLoading = false;
    });
  },
});

export const { authenticate, logout, addBox, addDeck, addCard } =
  mainSlice.actions;
export default mainSlice.reducer;
