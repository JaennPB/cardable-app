import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  userId: string;
  isAuth: boolean;
  data: {
    [box: string]: {
      [deck: string]: {
        [card: string]: {
          frontData: {
            title: string;
          };
          backData: {
            answer: string;
          };
        };
      };
    };
  };
}

const initialState: MainState = {
  userId: "",
  isAuth: false,
  data: {
    box1: {
      defaultDeck: {},
    },
    box3: {
      defaultDeck: {},
    },
    box4: {
      defaultDeck: {},
    },
  },
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { authenticate } = mainSlice.actions;
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
