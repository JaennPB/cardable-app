import { Button, ScrollView, View } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppSelector } from "../hooks/reduxHooks";

import PlusButton from "../components/UI/PlusButton";

const DecksScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const decksData = useAppSelector((state) => state.decks);

  function navigateToDeckHandler(deckName: string, deckId: number) {
    navigation.navigate("FlashcardsScreen", {
      deckId: deckId,
      deckName: deckName,
    });
  }

  function addDeckHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    navigation.navigate("ManageDataScreen", { type: "deck" });
  }

  return (
    <View flex={1} px={5} py={2} position="relative">
      <ScrollView>
        {decksData.map((deck, index) => (
          <Button
            key={index}
            mt={5}
            onPress={navigateToDeckHandler.bind(this, deck.deckName, index)}
          >
            {deck.deckName}
          </Button>
        ))}
      </ScrollView>
      <PlusButton onPress={addDeckHandler} />
    </View>
  );
};

export default DecksScreen;
