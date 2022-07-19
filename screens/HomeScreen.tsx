import { Dimensions, ListRenderItemInfo } from "react-native";
import { Flex, FlatList, View, ScrollView } from "native-base";

import BoxItem from "../components/BoxItem";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

const BOXES = ["Box 1", "Box 2", "Box 3", "Box 4", "Box 5"];

const HomeScreen: React.FC = () => {
  const XScrollData = useSharedValue(0);

  const xScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      XScrollData.value = event.contentOffset.x;
    },
  });

  return (
    <Flex flex={1} justify="center" bg="amber.200">
      <Flex h={height / 2} bg="white" justify="center" align="center">
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.5}
          scrollEventThrottle={16}
          onScroll={xScrollHandler}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          {BOXES.map((box, index) => (
            <BoxItem
              key={index}
              title={box}
              index={index}
              translateX={XScrollData}
            />
          ))}
        </Animated.ScrollView>
      </Flex>
    </Flex>
  );
};

export default HomeScreen;
