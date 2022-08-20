import { Flex, Heading } from "native-base";
import { useLayoutEffect } from "react";
import { Dimensions, Platform } from "react-native";

import * as Haptics from "expo-haptics";
import moment from "moment";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { useAppNavigation } from "../hooks/navigationHooks";

import { asyncFetchInitialData } from "../app/mainSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import BoxItem from "../components/UI/BoxItem";
import CustomSpinner from "../components/UI/CustomSpinner";
import DateReview from "../components/UI/DateReview";

const { width, height } = Dimensions.get("window");

const BoxesScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(asyncFetchInitialData(userId));
  }, []);

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

  return (
    <>
      {isLoadingState && <CustomSpinner />}
      {!isLoadingState && (
        <Flex flex={1} justify="center" bg="muted.50">
          <Heading
            flex={0.5}
            alignSelf="flex-start"
            ml={5}
            pt={5}
            fontFamily="Poppins_600SemiBold"
            size={Platform.OS === "ios" ? "2xl" : "md"}
            fontWeight="normal"
          >
            {moment().format("MMMM Do YYYY")}
          </Heading>
          <Flex flex={3} justify="center" align="center">
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
            </Animated.ScrollView>
          </Flex>
          <DateReview onPress={() => console.log("Change deck")} />
        </Flex>
      )}
    </>
  );
};

export default BoxesScreen;
