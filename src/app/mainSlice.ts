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
      state.isAuth = true;
    },
    logout: (state) => {
      (state.userId = ""), (state.isAuth = false);
      state.data = {
        box1: {
          defaultDeck: {},
        },
        box3: {
          defaultDeck: {},
        },
        box4: {
          defaultDeck: {},
        },
      };
    },
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
