import { useLayoutEffect } from "react";
import { Alert } from "react-native";
import { Button, Flex } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import Flashcard from "../components/UI/Flashcard";
import FlashcardControls from "../components/UI/FlashcardControls";

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

  function downgradeCardHandler() {
    console.log("down");
  }

  function skipCardHandler() {
    console.log("skip");
  }

  function upgradeCardHandler() {
    console.log("up");
  }

  return (
    <Flex flex={1} p={5}>
      {filteredCardsByBoxAndDeck.map((card, index) => (
        <Flex flex={0.8} justify="center" align="center" key={index}>
          <Flashcard
            question={card.question}
            answer={card.answer}
            key={index}
          />
        </Flex>
      ))}
      <Flex flex={0.2}>
        <FlashcardControls
          onPressNope={skipCardHandler}
          onPressSkip={downgradeCardHandler}
          onPressGotIt={upgradeCardHandler}
        />
      </Flex>
    </Flex>
  );
};

export default ActiveSessionScreen;
