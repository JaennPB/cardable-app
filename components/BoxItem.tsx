import { Dimensions, StyleSheet } from "react-native";
import { Text } from "native-base";

import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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

    return {
      transform: [{ translateY: translateY }],
    };
  });

  return (
    <Animated.View key={index} style={[styles.container, rStyle]}>
      <Text>{title}</Text>
    </Animated.View>
  );
};

export default BoxItem;

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#cf8d8d",
    marginLeft: width * 0.1,
  },
});
