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
  isLoading: boolean;
}

const initialState: MainState = {
  userId: "",
  isAuth: false,
  isLoading: true,
};
