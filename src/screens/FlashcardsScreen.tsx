import { useLayoutEffect } from "react";
import { ListRenderItemInfo } from "react-native";
import { Flex, Heading, FlatList } from "native-base";

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
  const deckId = deckName.toLowerCase().replace(/\s/g, "");

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

  function renderFlashcardItemHandler(itemData: ListRenderItemInfo<Flashcard>) {
    const item = itemData.item;

    return <FlashcardItem key={item.id} questionSnippet={item.question} />;
  }

  return (
    <FlexScreen>
      {filteredCards.length >= 1 && (
        <FlatList
          data={filteredCards}
          renderItem={renderFlashcardItemHandler}
        />
      )}
      {filteredCards.length <= 0 && (
        <Flex flex={1} justify="center" alignItems="center">
          <Heading textAlign="center" fontSize={18}>
            Now, add some flashcards to begin!
          </Heading>
        </Flex>
      )}
      <PlusButton onPress={addCardToDeckHandler} title="Add card" />
    </FlexScreen>
  );
};

export default FlashcardsScreen;
