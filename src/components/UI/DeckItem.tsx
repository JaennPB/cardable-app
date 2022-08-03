import { Alert } from "react-native";
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

import { writeBatch, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteDeck } from "../../app/mainSlice";

import HiddenButtons from "./HiddenButtons";

interface Props {
  title: string;
  onPress: () => void;
  fromContext: "deck" | "box";
  deckId: string;
  boxId?: number;
  index: number;
}

const DeckItem: React.FC<Props> = ({
  title,
  onPress,
  deckId,
  fromContext,
  boxId,
  index,
}) => {
  const dispatch = useAppDispatch();

  const allCards = useAppSelector((state) => state.allCards);
  const cardsInDeck = allCards.filter((card) => card.from === deckId);
  const userId = useAppSelector((state) => state.userId);

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
      if (translateX.value < -80) {
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

  async function deleteDeckItemHandler(deckId: string) {
    try {
      dispatch(deleteDeck(deckId));

      const batch = writeBatch(db);

      batch.delete(doc(db, "users", userId, "decks", deckId));
      cardsInDeck.forEach((card) => {
        batch.delete(doc(db, "users", userId, "cards", card.id));
      });

      await batch.commit();
    } catch {
      Alert.alert("There was a problem deleting your deck", "Please try again");
    }
  }

  return (
    <Animated.View
      style={{ position: "relative" }}
      entering={SlideInRight.delay(100 * index)}
      exiting={SlideOutLeft}
      layout={Layout.delay(100)}
    >
      {fromContext !== "box" && (
        <HiddenButtons
          translateX={translateX}
          onPress={deleteDeckItemHandler.bind(this, deckId)}
        />
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View style={fromContext !== "box" && rStyle}>
          <Pressable
            onPress={onPress}
            bg="teal.500"
            borderRadius={25}
            p={5}
            mb={5}
            h={66}
            shadow={3}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontSize={20} color="white" fontFamily="Poppins_400Regular">
                {title}
              </Text>
              <Text fontSize={16} color="white" fontFamily="Poppins_400Regular">
                {fromContext === "deck"
                  ? `${cardsInDeck.length} cards`
                  : `${filteredCardsByBoxAndDeck}/${cardsInDeck.length} cards`}
              </Text>
            </HStack>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default DeckItem;
