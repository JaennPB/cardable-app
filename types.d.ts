type NavParams = {
  LogInScreen: undefined;
  SignUpScreen: undefined;
  BoxesScreen: undefined;
  DecksScreen: undefined;
  FlashcardsScreen: { deckName: string };
  BeginSessionScreen: { boxName: string };
  ActiveSessionScreen: { boxId: string; deckId: string };
  StatsScreen: undefined;
  AccountScreen: undefined;
  BottomTabsNav: undefined;
  ManageDataScreen: { type: string; addCardFromDeck?: string };
};
