import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../db/firebase";
import { RootState } from "./store";

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

export const asyncFetchCards = createAsyncThunk(
  "users/asyncFetchCardsData",
  async (deckId: string, { getState }) => {
    const state = getState() as RootState;
    const userId = state.userId;

    let cardsInView: Flashcard[] = [];

    const cardsQuery = query(
      collection(db, "users", userId, "cards"),
      where("from", "==", deckId)
    );

    const cardsDataByDeck = await getDocs(cardsQuery);

    cardsDataByDeck.forEach((doc) => {
      const updatedDoc: Flashcard = {
        question: doc.data().question,
        answer: doc.data().answer,
        comment: doc.data().comment,
        from: doc.data().from,
        currBox: doc.data().currBox,
      };
      cardsInView.push(updatedDoc);
    });

    return cardsInView;
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
        boxId: action.payload,
      });
    },
    addDeck: (state, action: PayloadAction<string>) => {
      state.allDecks.push({
        deckName: action.payload,
        deckId: action.payload,
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
