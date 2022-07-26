import { ScrollView } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppSelector } from "../hooks/reduxHooks";

import PlusButton from "../components/UI/PlusButton";
import DeckItem from "../components/UI/DeckItem";
import FlexScreen from "../components/UI/FlexScreen";

const DecksScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const decksData = useAppSelector((state) => state.allDecks);

  function navigateToDeckHandler(deckName: string) {
    navigation.navigate("FlashcardsScreen", {
      deckName: deckName,
    });
  }

  function addDeckHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    navigation.navigate("ManageDataScreen", { type: "deck" });
  }

  return (
    <FlexScreen>
      <ScrollView>
        {decksData.map((deck, index) => (
          <DeckItem
            key={deck.deckId + index}
            title={deck.deckName}
            onPress={navigateToDeckHandler.bind(this, deck.deckName, index)}
          />
        ))}
      </ScrollView>
      <PlusButton onPress={addDeckHandler} title="Add deck" />
    </FlexScreen>
  );
};

export default DecksScreen;
