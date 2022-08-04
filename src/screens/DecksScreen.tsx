import { Flex, Heading, ScrollView } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppSelector } from "../hooks/reduxHooks";

import DeckItem from "../components/UI/DeckItem";
import PlusButton from "../components/UI/PlusButton";

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

    navigation.navigate("ManageDataScreen", { type: "Deck" });
  }

  return (
    <Flex flex={1} p={5} pt={6} bg="muted.50" borderTopRadius={20}>
      {decksData.length >= 1 && (
        <ScrollView>
          {decksData.map((deck, index) => (
            <DeckItem
              key={deck.deckId}
              title={deck.deckName}
              onPress={() => navigateToDeckHandler(deck.deckName)}
              deckId={deck.deckId}
              fromContext="deck"
              index={index}
            />
          ))}
        </ScrollView>
      )}
      {decksData.length <= 0 && (
        <Flex flex={1} justify="center" alignItems="center">
          <Heading
            textAlign="center"
            fontSize={18}
            fontFamily="Poppins_600SemiBold"
            fontWeight="normal"
          >
            Please begin by adding some decks.
          </Heading>
        </Flex>
      )}
      <PlusButton onPress={addDeckHandler} title="Add Deck" />
    </Flex>
  );
};

export default DecksScreen;
