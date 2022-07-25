type NavParams = {
  LogInScreen: undefined;
  SignUpScreen: undefined;
  BoxesScreen: undefined;
  DecksScreen: { boxId: number };
  FlashcardsScreen: { deckName: string };
  AccountScreen: undefined;
  BottomTabsNav: undefined;
  ManageDataScreen: { type: string; addCardFromDeck?: string };
};
