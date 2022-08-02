import { useLayoutEffect, useRef, useState } from "react";
import { Alert, Dimensions, FlatList, ListRenderItemInfo } from "react-native";
import { Button, Flex, Heading, Text, View } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import Flashcard from "../components/UI/Flashcard";
import CustomButton from "../components/UI/CustomButton";

const { width } = Dimensions.get("window");

const ActiveSessionScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<NavParams, "ActiveSessionScreen">>();
  const { boxId, deckId } = route.params;

  const [nextIndex, setNextIndex] = useState(1);
  const [docsToUpdate, setDocsToUpdate] = useState<
    { cardId: string; type: "up" | "down"; newBox: number }[]
  >([]);

  const allCards = useAppSelector((state) => state.allCards);
  const allBoxes = useAppSelector((state) => state.allBoxes);
  const filteredCardsByBoxAndDeck = allCards.filter(
    (card) => card.currBox === boxId && card.from === deckId
  );

  function endSessionHandler() {
    Alert.alert(
      "Are you sure?",
      "There are still some flashcards left on this box.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "default",
        },
        {
          text: "End session",
          onPress: () =>
            navigation.navigate("StatsScreen", {
              updatedItems: docsToUpdate,
              cardsInBoxLength: filteredCardsByBoxAndDeck.length,
            }),
          style: "destructive",
        },
      ]
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant="ghost"
          _text={{ fontSize: 18, color: "danger.400" }}
          onPress={endSessionHandler}
        >
          End session
        </Button>
      ),
    });
  }, []);

  const ref = useRef<FlatList>(null);
  function autoScroll() {
    if (nextIndex < filteredCardsByBoxAndDeck.length) {
      setNextIndex(nextIndex + 1);
      ref.current?.scrollToIndex({ animated: true, index: nextIndex });
    } else {
      navigation.navigate("StatsScreen", {
        updatedItems: docsToUpdate,
        cardsInBoxLength: filteredCardsByBoxAndDeck.length,
      });
    }
  }

  function upgradeOrDowngradeCard(
    cardId: string,
    type: "down" | "up" | "skip",
    currBox: number
  ) {
    if (type === "down" && currBox !== 1) {
      const newBox = currBox - 1;
      docsToUpdate.push({ cardId, type, newBox });
    }

    if (type === "up" && currBox < allBoxes.length) {
      const newBox = currBox + 1;
      docsToUpdate.push({ cardId, type, newBox });
    }

    autoScroll();
  }

  function renderFlashcardItemHandler(itemData: ListRenderItemInfo<Flashcard>) {
    const item = itemData.item;

    return (
      <Flex px={width * 0.05}>
        <Flashcard
          question={item.question}
          answer={item.answer}
          onPressDowngrade={() =>
            upgradeOrDowngradeCard(item.id, "down", item.currBox)
          }
          onPressUpgrade={() =>
            upgradeOrDowngradeCard(item.id, "up", item.currBox)
          }
          onPressStay={autoScroll}
        />
      </Flex>
    );
  }

  return (
    <>
      {filteredCardsByBoxAndDeck.length <= 0 && (
        <Flex flex={1} justify="center" alignItems="center">
          <Heading textAlign="center" fontSize={18}>
            Looks like there are no cards from this deck availible in this box.
          </Heading>
          <Text my={2}>Please check subsequent or previous boxes.</Text>
          <CustomButton
            title="Go to boxes screen"
            onPress={() => navigation.navigate("BoxesScreen")}
          />
        </Flex>
      )}
      <FlatList
        scrollEnabled={false}
        ref={ref}
        data={filteredCardsByBoxAndDeck}
        renderItem={renderFlashcardItemHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
      />
    </>
  );
};

export default ActiveSessionScreen;
