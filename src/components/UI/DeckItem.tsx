import { Text, Pressable, HStack } from "native-base";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SlideInRight,
  Layout,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useAppSelector } from "../../hooks/reduxHooks";
import HiddenButtons from "./HiddenButtons";

interface Props {
  title: string;
  onPress: () => void;
  fromContext: "deck" | "box";
  deckId: string;
  boxId?: number;
}

const DeckItem: React.FC<Props> = ({
  title,
  onPress,
  deckId,
  fromContext,
  boxId,
}) => {
  const allCards = useAppSelector((state) => state.allCards);

  const cardsInDeck = allCards.filter((card) => card.from === deckId).length;

  const filteredCardsByBoxAndDeck = allCards.filter(
    (card) => card.currBox === boxId && card.from === deckId
  ).length;

  const translateX = useSharedValue(0);
  const context = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value;

      if (event.translationX + context.value > 0) {
        translateX.value = 0;
      }
    })
    .onEnd(() => {
      if (translateX.value < -50) {
        translateX.value = withTiming(-100);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <Animated.View style={{ position: "relative" }}>
      <HiddenButtons translateX={translateX} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={rStyle}>
          <Pressable
            onPress={onPress}
            bg="blue.400"
            borderRadius={10}
            p={5}
            mb={5}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontSize={18} color="white" fontWeight="semibold">
                {title}
              </Text>
              <Text fontSize={16} color="white">
                {fromContext === "deck"
                  ? `${cardsInDeck} cards`
                  : `${filteredCardsByBoxAndDeck}/${cardsInDeck} cards`}
              </Text>
            </HStack>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default DeckItem;
