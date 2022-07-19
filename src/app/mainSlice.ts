import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {}

const initialState: MainState = {};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;
