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
import HiddenButtons from "./HiddenButtons";

interface Props {
  questionSnippet: string;
}

const FlashcardItem: React.FC<Props> = ({ questionSnippet }) => {
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
      <HiddenButtons translateX={translateX} isFlashcard />
      <GestureDetector gesture={gesture}>
        <Animated.View style={rStyle}>
          <View bg="blue.400" borderRadius={10} p={5} mb={5}>
            <Text color="white" fontSize={18} fontWeight="semibold">
              Question:
            </Text>
            <Text color="white" fontSize={16}>
              {questionSnippet}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default FlashcardItem;
