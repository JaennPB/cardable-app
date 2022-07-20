import { Dimensions, Pressable } from "react-native";
import { Button, Flex } from "native-base";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import BoxItem from "../components/BoxItem";

const { height, width } = Dimensions.get("window");

const BOXES = ["Box 1", "Box 2", "Box 3", "Box 4", "Box 5", "Add box +"];

const HomeScreen: React.FC = () => {
  const XScrollData = useSharedValue(0);

  const xScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      XScrollData.value = event.contentOffset.x;
    },
  });

  function openBoxHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <Flex flex={1} justify="center" bg="amber.200">
      <Flex h={height / 2} bg="white" justify="center" align="center">
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={xScrollHandler}
          contentContainerStyle={{
            alignItems: "center",
          }}
          snapToInterval={width * 0.8}
        >
          {BOXES.map((box, index) => (
            <Pressable key={index} onPress={openBoxHandler.bind(this, index)}>
              <BoxItem title={box} index={index} translateX={XScrollData} />
            </Pressable>
          ))}
        </Animated.ScrollView>
      </Flex>
    </Flex>
  );
};

export default HomeScreen;