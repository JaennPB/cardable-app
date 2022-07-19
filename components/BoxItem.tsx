import { Dimensions, StyleSheet } from "react-native";
import { Text } from "native-base";

import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const BOXES = ["Box 1", "Box 2", "Box 3", "Box 4", "Box 5", "Box 6"];

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
      [0, -35, 0]
    );

    return {
      transform: [{ translateY: translateY }],
    };
  });

  function itemSeparator(index: number) {
    if (index === 0) {
      return { marginLeft: width * 0.15 };
    } else if (index === BOXES.length - 1) {
      return { marginRight: width * 0.15, marginLeft: width * 0.1 };
    } else if (index > 0 && index < BOXES.length - 1) {
      return { marginLeft: width * 0.1 };
    }
  }

  return (
    <Animated.View
      key={index}
      style={[styles.container, rStyle, itemSeparator(index)]}
    >
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
    // marginLeft: width * 0.1,
  },
});
