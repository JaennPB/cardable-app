import { useLayoutEffect, useRef, useState } from "react";
import { Alert, Dimensions, FlatList, ListRenderItemInfo } from "react-native";
import { Button, Flex, View } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import Flashcard from "../components/UI/Flashcard";

const { width } = Dimensions.get("window");

const ActiveSessionScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<NavParams, "ActiveSessionScreen">>();
  const { boxId, deckId } = route.params;

  const [nextIndex, setNextIndex] = useState(1);
  const [docsToUpdate, setDocsToUpdate] = useState<
    { cardId: string; type: "up" | "down" }[]
  >([]);

  const allCards = useAppSelector((state) => state.allCards);
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
            navigation.navigate("StatsScreen", { updatedItems: docsToUpdate }),
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
      navigation.navigate("StatsScreen", { updatedItems: docsToUpdate });
    }
  }

  function upgradeOrDowngradeCard(
    cardId: string,
    type: "down" | "up" | "skip"
  ) {
    if (type === "down") {
      docsToUpdate.push({ cardId, type });
    }

    if (type === "up") {
      docsToUpdate.push({ cardId, type });
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
          onPressDowngrade={() => upgradeOrDowngradeCard(item.id, "down")}
          onPressUpgrade={() => upgradeOrDowngradeCard(item.id, "up")}
          onPressStay={autoScroll}
        />
      </Flex>
    );
  }

  return (
    <Flex flex={1} justify="center">
      <View>
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
      </View>
    </Flex>
  );
};

export default ActiveSessionScreen;
