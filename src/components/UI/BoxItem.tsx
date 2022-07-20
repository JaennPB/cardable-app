import { Dimensions, StyleSheet } from "react-native";
import { Heading } from "native-base";

import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { useItemSeparator } from "../../hooks/utils";

interface Props {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { width } = Dimensions.get("window");

const BoxItem: React.FC<Props> = ({ title, index, translateX }) => {
  const rStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [
        (index - 1) * (width * 0.8),
        index * (width * 0.8),
        (index + 1) * (width * 0.8),
      ],
      [0, -30, 0]
    );

    const shadowY = interpolate(
      translateX.value,
      [
        (index - 1) * (width * 0.8),
        index * (width * 0.8),
        (index + 1) * (width * 0.8),
      ],
      [0.1, 0.3, 0.1]
    );

    return {
      transform: [{ translateY: translateY }],
      shadowOpacity: withSpring(shadowY),
    };
  });

  return (
    <Animated.View
      key={index}
      style={[styles.container, rStyle, useItemSeparator(index, width)]}
    >
      <Heading fontWeight="semibold">{title}</Heading>
    </Animated.View>
  );
};

export default BoxItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: "#dbdbdb",
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#424242",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
  },
});
