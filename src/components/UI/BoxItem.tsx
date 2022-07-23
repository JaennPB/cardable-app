import { Dimensions, StyleSheet } from "react-native";
import { Heading, Pressable } from "native-base";

import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
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
  const arrLength = useAppSelector((state) => state.boxes);

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
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          styles.container,
          rStyle,
          useItemSeparator(index, width, arrLength.length + 1),
        ]}
      >
        <Heading fontWeight="semibold">{title}</Heading>
      </Animated.View>
    </Pressable>
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
