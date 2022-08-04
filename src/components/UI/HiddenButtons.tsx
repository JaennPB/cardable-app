import { Pressable, Text } from "native-base";

import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  translateX: Animated.SharedValue<number>;
  isFlashcard?: boolean;
  onPress: () => void;
}

const HiddenButtons: React.FC<Props> = ({
  translateX,
  isFlashcard,
  onPress,
}) => {
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
        borderRadius={25}
        px={6}
        right={0}
        w="100%"
        h={isFlashcard ? 90 : 66}
        justifyContent="center"
        alignItems="center"
        onPress={onPress}
      >
        <Text
          color="white"
          fontSize={18}
          alignSelf="flex-end"
          fontFamily="Poppins_600SemiBold"
        >
          Delete
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default HiddenButtons;
