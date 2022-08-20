import { Flex, Heading, Pressable } from "native-base";
import { Dimensions } from "react-native";

import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useAppSelector } from "../../hooks/reduxHooks";

import { useItemSeparator } from "../../hooks/utils";

interface Props {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
  onPress: () => void;
}

const { width } = Dimensions.get("window");

const BoxItem: React.FC<Props> = ({ title, index, translateX, onPress }) => {
  const arrLength = useAppSelector((state) => state.allBoxes);

  const rStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [
        (index - 1) * (width * 0.8),
        index * (width * 0.8),
        (index + 1) * (width * 0.8),
      ],
      [0, -20, 0]
    );

    return {
      transform: [{ translateY: translateY }],
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[rStyle, useItemSeparator(index, width, arrLength.length)]}
      >
        <Flex
          w={width * 0.7}
          height={width * 0.7}
          justify="center"
          align="center"
          borderRadius={25}
          bg="white"
          shadow={4}
        >
          <Heading
            fontFamily="Poppins_600SemiBold"
            size="xl"
            fontWeight="normal"
          >
            {title}
          </Heading>
        </Flex>
      </Animated.View>
    </Pressable>
  );
};

export default BoxItem;
