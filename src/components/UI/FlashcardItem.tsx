import { Alert } from "react-native";
import { Text, View } from "native-base";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SlideInRight,
  Layout,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteCard } from "../../app/mainSlice";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../db/firebase";

import HiddenButtons from "./HiddenButtons";

interface Props {
  questionSnippet: string;
  cardId: string;
  index: number;
}

const FlashcardItem: React.FC<Props> = ({ questionSnippet, cardId, index }) => {
  const userId = useAppSelector((state) => state.userId);

  const dispatch = useAppDispatch();
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

  async function deleteFlashcardHandler(cardId: string) {
    try {
      dispatch(deleteCard(cardId));

      await deleteDoc(doc(db, "users", userId, "cards", cardId));
    } catch {
      Alert.alert("Could not delete card", "Please try again");
    }
  }

  return (
    <Animated.View
      entering={SlideInRight.delay(100 * index)}
      exiting={SlideOutLeft}
      layout={Layout.delay(100)}
    >
      <HiddenButtons
        translateX={translateX}
        isFlashcard
        onPress={deleteFlashcardHandler.bind(this, cardId)}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={rStyle}>
          <View bg="teal.500" borderRadius={30} p={5} mb={5} h={90} shadow={3}>
            <Text color="white" fontSize={20} fontFamily="Poppins_600SemiBold">
              Question:
            </Text>
            <Text
              color="white"
              fontSize={18}
              fontFamily="Poppins_400Regular"
              pb={5}
            >
              {questionSnippet}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default FlashcardItem;
