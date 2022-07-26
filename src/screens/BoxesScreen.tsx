import { useLayoutEffect } from "react";
import { Dimensions } from "react-native";
import { Flex, Heading } from "native-base";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { asyncFetchInitialData } from "../app/mainSlice";

import BoxItem from "../components/UI/BoxItem";
import CustomSpinner from "../components/UI/CustomSpinner";

const { height, width } = Dimensions.get("window");

const BoxesScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userId);
  const boxesData = useAppSelector((state) => state.allBoxes);
  const isLoadingState = useAppSelector((state) => state.isLoading);

  const XScrollData = useSharedValue(0);
  const xScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      XScrollData.value = event.contentOffset.x;
    },
  });

  function openBoxHandler(boxId: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("SessionScreen", { boxId: boxId });
  }

  function addBoxHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ManageDataScreen", { type: "box" });
  }

  useLayoutEffect(() => {
    dispatch(asyncFetchInitialData(userId));
  }, []);

  return (
    <Flex flex={1} justify="center">
      <Heading alignSelf="flex-start" ml={5}>
        Your boxes
      </Heading>
      <Flex h={height / 2} justify="center" align="center">
        {isLoadingState && <CustomSpinner />}
        {!isLoadingState && (
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
            {boxesData.map((box, index) => (
              <BoxItem
                key={index}
                title={box.boxName}
                index={index}
                translateX={XScrollData}
                onPress={openBoxHandler.bind(this, box.boxId)}
              />
            ))}
            <BoxItem
              title="+ Add box"
              index={boxesData.length}
              translateX={XScrollData}
              onPress={addBoxHandler}
            />
          </Animated.ScrollView>
        )}
      </Flex>
    </Flex>
  );
};

export default BoxesScreen;
