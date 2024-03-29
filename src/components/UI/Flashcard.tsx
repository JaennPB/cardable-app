import { Button, Flex, Heading } from "native-base";
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
  comment: string;
  onPressDowngrade: () => void;
  onPressUpgrade: () => void;
  onPressStay: () => void;
}
const { width } = Dimensions.get("window");

const Flashcard: React.FC<Props> = ({
  question,
  answer,
  comment,
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
      <Flex flex={0.8} mt={5} shadow={3}>
        <Animated.View style={[styles.card, rStylesFront]}>
          <Heading fontFamily="Poppins_600SemiBold" fontWeight="normal">
            {question}
          </Heading>
          <Button
            variant="ghost"
            onPress={flipCardHandler}
            borderRadius={50}
            zIndex={20}
            _text={{
              fontSize: 20,
              color: "#14b8a6",
              fontFamily: "Poppins_400Regular",
            }}
          >
            View answer
          </Button>
        </Animated.View>
        <Animated.View style={[styles.card, styles.backCard, rStylesBack]}>
          <Heading fontFamily="Poppins_600SemiBold" fontWeight="normal">
            {answer}
          </Heading>
          <Heading fontFamily="Poppins_400Regular" fontWeight="normal">
            {comment}
          </Heading>
        </Animated.View>
      </Flex>
      <Flex flex={0.2} pt={5}>
        {cardIsFlipped && (
          <Animated.View entering={SlideInDown}>
            <FlashcardControls
              onPressDowngrade={onPressDowngrade}
              onPressUpgrade={onPressUpgrade}
              onPressStay={onPressStay}
            />
          </Animated.View>
        )}
      </Flex>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backfaceVisibility: "hidden",
    backgroundColor: "white",
    justifyContent: "space-around",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    alignItems: "center",
    height: "100%",
    width: width * 0.9,
  },
  backCard: {
    position: "absolute",
    top: 0,
  },
});

export default Flashcard;
