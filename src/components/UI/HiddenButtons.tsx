import { Pressable, Text } from "native-base";

import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface Props {
  translateX: Animated.SharedValue<number>;
  isFlashcard?: boolean;
}

const HiddenButtons: React.FC<Props> = ({ translateX, isFlashcard }) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [0, -100];
    const opacity = interpolate(translateX.value, inputRange, [0, 1]);
    const right = interpolate(translateX.value, inputRange, [-10, 0]);

    return {
      opacity: opacity,
      right: right + "%",
    };
  });

  return (
    <Animated.View style={rStyle}>
      <Pressable
        position="absolute"
        bg="danger.400"
        borderRadius={10}
        px={6}
        mb={5}
        right={0}
        w="100%"
        justifyContent="center"
        alignItems="center"
        py={isFlashcard ? 8 : 5}
      >
        <Text color="white" fontSize={18} alignSelf="flex-end">
          Delete
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default HiddenButtons;
