import { useLayoutEffect } from "react";
import { Button, ScrollView, Text, Pressable } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppSelector } from "../hooks/reduxHooks";

import PlusButton from "../components/UI/PlusButton";
import FlexScreen from "../components/UI/FlexScreen";
import FlashcardItem from "../components/UI/FlashcardItem";

const FlashcardsScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<NavParams, "FlashcardsScreen">>();
  const { deckName } = route.params;
  const deckId = deckName.toLowerCase().replace(/\s/, "");

  const filteredCards = useAppSelector((state) => state.allCards).filter(
    (card) => card.from === deckId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: deckName,
    });
  }, []);

  function addCardToDeckHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ManageDataScreen", {
      type: "card",
      addCardFromDeck: deckId,
    });
  }

  return (
    <FlexScreen>
      <ScrollView>
        {filteredCards.map((card, index) => (
          <FlashcardItem
            key={index}
            questionSnippet={card.question}
            onPress={() => console.log("Viewing card")}
          />
        ))}
      </ScrollView>
      <PlusButton onPress={addCardToDeckHandler} title="Add card" />
    </FlexScreen>
  );
};

export default FlashcardsScreen;
