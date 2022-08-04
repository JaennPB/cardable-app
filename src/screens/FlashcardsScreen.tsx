import { Flex, Heading, ScrollView } from "native-base";
import { useLayoutEffect } from "react";

import * as Haptics from "expo-haptics";

import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import FlashcardItem from "../components/UI/FlashcardItem";
import FlexScreen from "../components/UI/FlexScreen";
import PlusButton from "../components/UI/PlusButton";

const FlashcardsScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<NavParams, "FlashcardsScreen">>();
  const { deckName } = route.params;
  const deckId = deckName.toLowerCase().replace(/\s/g, "");

  const allCards = useAppSelector((state) => state.allCards);
  const cardsFiltered = allCards.filter((card) => card.from === deckId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: deckName,
    });
  }, []);

  function addCardToDeckHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ManageDataScreen", {
      type: "Card",
      addCardFromDeck: deckId,
    });
  }

  return (
    <FlexScreen>
      {cardsFiltered.length >= 1 && (
        <ScrollView>
          {cardsFiltered.map((card, index) => (
            <FlashcardItem
              questionSnippet={card.question}
              cardId={card.id}
              index={index}
              key={card.id}
            />
          ))}
        </ScrollView>
      )}
      {cardsFiltered.length <= 0 && (
        <Flex flex={1} justify="center" alignItems="center">
          <Heading
            textAlign="center"
            fontSize={18}
            fontFamily="Poppins_600SemiBold"
            fontWeight="normal"
          >
            Now, add some flashcards to begin!
          </Heading>
        </Flex>
      )}
      <PlusButton onPress={addCardToDeckHandler} title="Add Card" />
    </FlexScreen>
  );
};

export default FlashcardsScreen;
