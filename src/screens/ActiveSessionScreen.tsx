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

  const allCards = useAppSelector((state) => state.allCards);
  const filteredCardsByBoxAndDeck = allCards.filter(
    (card) => card.currBox === boxId && card.from === deckId
  );

  function endSessionHandler() {
    Alert.alert(
      "Are you sure you want to end your session?",
      "There are still some flashcards left on this box.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "default",
        },
        {
          text: "End session",
          onPress: () => navigation.navigate("StatsScreen"),
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
  const [nextIndex, setNextIndex] = useState(1);

  function autoScroll() {
    if (nextIndex < filteredCardsByBoxAndDeck.length) {
      ref.current?.scrollToIndex({ animated: true, index: nextIndex });
      setNextIndex((prevState) => prevState + 1);
    } else {
      navigation.navigate("StatsScreen");
    }
  }

  function downgradeCardHandler(cardId: string) {
    console.log("down", cardId);
    autoScroll();
  }

  function upgradeCardHandler(cardId: string) {
    console.log("up", cardId);
    autoScroll();
  }

  function keepCardHandler(cardId: string) {
    console.log("stay", cardId);
    autoScroll();
  }

  function renderFlashcardItemHandler(itemData: ListRenderItemInfo<Flashcard>) {
    const item = itemData.item;

    return (
      <Flex px={width * 0.05}>
        <Flashcard
          question={item.question}
          answer={item.answer}
          onPressDowngrade={() => downgradeCardHandler(item.id)}
          onPressUpgrade={() => upgradeCardHandler(item.id)}
          onPressStay={() => keepCardHandler(item.id)}
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
