type NavParams = {
  LogInScreen: undefined;
  SignUpScreen: undefined;
  BoxesScreen: undefined;
  DecksScreen: undefined;
  FlashcardsScreen: { deckName: string };
  SessionScreen: { boxName: string };
  ActiveSessionScreen: { boxId: string; deckId: string };
  AccountScreen: undefined;
  BottomTabsNav: undefined;
  ManageDataScreen: { type: string; addCardFromDeck?: string };
};
