import { Button, Heading, View } from "native-base";
import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import Animated, {
  Easing,
  interpolate,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import FlashcardControls from "./FlashcardControls";

interface Props {
  question: string;
  answer: string;
  onPressDowngrade: () => void;
  onPressUpgrade: () => void;
  onPressStay: () => void;
}
const { width } = Dimensions.get("window");

const Flashcard: React.FC<Props> = ({
  question,
  answer,
  onPressDowngrade,
  onPressUpgrade,
  onPressStay,
}) => {
  const [cardIsFlipped, setCardIsFlipped] = useState(false);

  const rotateY = useSharedValue(0);

  function flipCardHandler() {
    rotateY.value = 180;
    setCardIsFlipped(true);
  }

  const rStylesFront = useAnimatedStyle(() => {
    const rotateFront = interpolate(rotateY.value, [0, 180], [0, 180]);

    return {
      transform: [
        {
          rotateY: withTiming(`${rotateFront}deg`, {
            duration: 600,
            easing: Easing.exp,
          }),
        },
      ],
      zIndex: 10,
    };
  });

  const rStylesBack = useAnimatedStyle(() => {
    const rotateBack = interpolate(rotateY.value, [0, 180], [180, 360]);

    return {
      transform: [
        {
          rotateY: withTiming(`${rotateBack}deg`, {
            duration: 600,
            easing: Easing.exp,
          }),
        },
      ],
    };
  });

  return (
    <>
      <View style={[styles.container]}>
        <Animated.View style={[styles.card, rStylesFront]}>
          <Heading>{question}</Heading>
          <Button
            variant="ghost"
            onPress={flipCardHandler}
            borderRadius={50}
            zIndex={20}
            _text={{ fontSize: 20, color: "black" }}
          >
            View answer
          </Button>
        </Animated.View>
        <Animated.View style={[styles.card, styles.backCard, rStylesBack]}>
          <Heading>{answer}</Heading>
        </Animated.View>
      </View>
      {cardIsFlipped && (
        <Animated.View entering={SlideInDown}>
          <FlashcardControls
            onPressDowngrade={onPressDowngrade}
            onPressUpgrade={onPressUpgrade}
            onPressStay={onPressStay}
          />
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: width * 1.4,
  },
  card: {
    backfaceVisibility: "hidden",
    backgroundColor: "white",
    justifyContent: "space-around",
    borderRadius: 40,
    padding: 20,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  backCard: {
    position: "absolute",
    top: 0,
  },
});

export default Flashcard;
