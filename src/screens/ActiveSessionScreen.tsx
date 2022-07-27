import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, Flex, Heading, View } from "native-base";

import Animated, {
  FadeOutUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import Flashcard from "../components/UI/Flashcard";
import CustomButton from "../components/UI/CustomButton";

const ActiveSessionScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const [cardIsFlipped, setCardIsFlipped] = useState(false);

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

  const rotateY = useSharedValue(0);

  function flipCardHandler() {
    rotateY.value = 180;
    setCardIsFlipped(true);
  }

  const rStylesFront = useAnimatedStyle(() => {
    const rotateFront = interpolate(rotateY.value, [0, 180], [0, 180]);

    return {
      transform: [{ rotateY: withTiming(`${rotateFront}deg`) }],
    };
  });

  const rStylesBack = useAnimatedStyle(() => {
    const rotateBack = interpolate(rotateY.value, [0, 180], [180, 360]);

    return {
      transform: [{ rotateY: withTiming(`${rotateBack}deg`) }],
    };
  });

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

  function upgradeCardHandler() {}

  function downgradeCardHandler() {}

  // flatlist of all cards, autoscroll when passed to the next

  return (
    <Flex flex={1} justify="center" align="center">
      <Heading>{!cardIsFlipped ? "Question:" : "Answer"}</Heading>
      {filteredCardsByBoxAndDeck.map((card, index) => (
        <View key={index}>
          <Animated.View style={[styles.hidden, rStylesFront]}>
            <Flashcard text={card.question} />
          </Animated.View>
          <Animated.View style={[styles.backCard, styles.hidden, rStylesBack]}>
            <Flashcard text={card.answer} />
          </Animated.View>
          {!cardIsFlipped && (
            <Animated.View exiting={FadeOutUp}>
              <CustomButton onPress={flipCardHandler} title="View answer" />
            </Animated.View>
          )}
        </View>
      ))}
    </Flex>
  );
};

const styles = StyleSheet.create({
  hidden: {
    backfaceVisibility: "hidden",
  },
  backCard: {
    position: "absolute",
    top: 0,
  },
});

export default ActiveSessionScreen;
