import { useLayoutEffect } from "react";
import { Dimensions, Platform } from "react-native";
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
import DateReview from "../components/UI/DateReview";

const { width } = Dimensions.get("window");

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

  useLayoutEffect(() => {
    dispatch(asyncFetchInitialData(userId));
  }, []);

  function navigateToBoxShortcutHandler(boxId: number, boxName: string) {
    navigation.navigate("BeginSessionScreen", { boxId, boxName });
  }

  return (
    <>
      {isLoadingState && <CustomSpinner />}
      {!isLoadingState && (
        <Flex flex={1} justify="center" bg="muted.100">
          <Flex flex={1}>
            <Heading
              alignSelf="flex-start"
              ml={5}
              pt={10}
              fontFamily="Poppins_600SemiBold"
              size={Platform.OS === "ios" ? "2xl" : "lg"}
              fontWeight="normal"
            >
              Your boxes
            </Heading>
          </Flex>
          <Flex flex={5} justify="center" align="center">
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
          <Flex
            flex={2}
            bg="white"
            w={width}
            p={5}
            borderTopRadius={20}
            justify="space-around"
          >
            <DateReview
              onPressToday={navigateToBoxShortcutHandler.bind(this, 1, "Box 1")}
              onPressTomorrow={navigateToBoxShortcutHandler.bind(
                this,
                3,
                "Box 3"
              )}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default BoxesScreen;
