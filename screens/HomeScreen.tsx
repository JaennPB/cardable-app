import { Dimensions, ListRenderItemInfo } from "react-native";
import { Flex, Box, FlatList, View } from "native-base";

import Animated from "react-native-reanimated";

import BoxItem from "../components/BoxItem";

const { height, width } = Dimensions.get("window");

const BOXES = ["Box 1", "Box 2", "Box 3", "Box 4"];

const HomeScreen: React.FC = () => {
  function renderBoxItemHandler(itemData: ListRenderItemInfo<string>) {
    return <BoxItem title={itemData.item} index={itemData.index} />;
  }

  return (
    <Flex flex={1} justify="center">
      <Box h={height / 2} bg="amber.100">
        <FlatList
          data={BOXES}
          renderItem={renderBoxItemHandler}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          //   snapToInterval={width * 0.8}
          //   snapToAlignment="center"
          scrollEventThrottle={16}
          ItemSeparatorComponent={() => <View w={width * 0.1} />}
        />
      </Box>
    </Flex>
  );
};

export default HomeScreen;
