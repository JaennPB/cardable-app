import { Flex, Heading, ScrollView } from "native-base";

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
    <Flex flex={1} p={5}>
      {decksData.length >= 1 && (
        <ScrollView>
          {decksData.map((deck) => (
            <DeckItem
              key={deck.deckId}
              title={deck.deckName}
              onPress={navigateToDeckHandler.bind(this, deck.deckName)}
            />
          ))}
        </ScrollView>
      )}
      {decksData.length <= 0 && (
        <Flex flex={1} justify="center" alignItems="center">
          <Heading textAlign="center" fontSize={18}>
            Please begin by adding some decks.
          </Heading>
        </Flex>
      )}
      <PlusButton onPress={addDeckHandler} title="Add deck" />
    </Flex>
  );
};

export default DecksScreen;
