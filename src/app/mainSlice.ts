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

interface MainState {
  userId: string;
  isAuth: boolean;
  boxData: string[];
  isLoading: boolean;
}

const initialState: MainState = {
  userId: "",
  isAuth: false,
  boxData: [],
  isLoading: true,
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
  },
  extraReducers: (builder) => {
    builder.addCase(asyncFetchInitialData.fulfilled, (state, action) => {
      state.boxData = action.payload;
      state.isLoading = false;
    });
  },
});

export const { authenticate, logout } = mainSlice.actions;
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
