type NavParams = {
  LogInScreen: undefined;
  SignUpScreen: undefined;
  BoxesScreen: undefined;
  DecksScreen: undefined;
  FlashcardsScreen: { deckName: string };
  BeginSessionScreen: { boxName: string; boxId: number };
  ActiveSessionScreen: { boxId: number; deckId: string };
  StatsScreen: { updatedItems: { cardId: string; type: "up" | "down" }[] };
  StatsScreen: undefined;
  AccountScreen: undefined;
  BottomTabsNav: undefined;
  ManageDataScreen: { type: string; addCardFromDeck?: string };
};

type Flashcard = {
  question: string;
  answer: string;
  comment: string;
  from: string;
  currBox: number;
  id: string;
};
