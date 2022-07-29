import { useLayoutEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { Flex, Heading } from "native-base";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import moment from "moment";

import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { asyncFetchInitialData } from "../app/mainSlice";

import BoxItem from "../components/UI/BoxItem";
import CustomSpinner from "../components/UI/CustomSpinner";
import CustomButton from "../components/UI/CustomButton";

const { height, width } = Dimensions.get("window");

console.log("WARNING");

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

  function openBoxHandler(boxName: string, boxId: number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("BeginSessionScreen", {
      boxName: boxName,
      boxId: boxId,
    });
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
      <Flex h={height * 0.7} justify="center" align="center">
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
                onPress={openBoxHandler.bind(this, box.boxName, box.boxId)}
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
        {!isLoadingState && (
          <Flex bg="white" w={width * 0.8} p={5} borderRadius={10}>
            <Heading mb={5} textAlign="center">
              {moment().format("MMMM Do YYYY")}
            </Heading>
            <CustomButton title="Review Box 3" onPress={() => {}} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default BoxesScreen;
