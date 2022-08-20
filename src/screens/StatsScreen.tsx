import { Flex, Heading } from "native-base";
import { useEffect } from "react";
import { Alert, Dimensions } from "react-native";

import Animated, {
  SlideInDown,
  SlideInUp,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { manageCard } from "../app/mainSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { doc, writeBatch } from "firebase/firestore";
import { db } from "../db/firebase";

import CustomButton from "../components/UI/CustomButton";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 900;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const StatsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userId);

  const route = useRoute<RouteProp<NavParams, "StatsScreen">>();
  const { updatedItems, cardsInBoxLength } = route.params;

  const progress = useSharedValue(0);

  let percentage: number;
  const upCards = updatedItems.filter((card) => card.type === "up").length;
  if (upCards === 0) {
    percentage = 0;
  }
  if (upCards > 0) {
    percentage = upCards / cardsInBoxLength;
  }

  useEffect(() => {
    async function updateData() {
      try {
        const batch = writeBatch(db);

        updatedItems.forEach((card) => {
          dispatch(manageCard({ cardId: card.cardId, type: card.type }));
          batch.update(doc(db, "users", userId, "cards", card.cardId), {
            currBox: card.newBox,
          });
        });

        await batch.commit();
      } catch {
        Alert.alert("Could not update data, please try again.");
      }
    }

    updateData();

    setTimeout(() => {
      progress.value = withTiming(percentage, { duration: 2000 });
    }, 500);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const animatedText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });

  function continueHandler() {
    navigation.navigate("BoxesScreen");
  }

  return (
    <>
      <Flex
        flex={0.6}
        justify="center"
        align="center"
        position="relative"
        bg="muted.50"
      >
        <ReText
          style={{ fontSize: 60, fontFamily: "Poppins_600SemiBold" }}
          text={animatedText}
        />
        <Flex position="absolute" h={height} w={width}>
          <Svg>
            <Circle
              cx={width / 2}
              cy={height / 2}
              r={CIRCLE_LENGTH / (2 * Math.PI)}
              strokeWidth={25}
              stroke="#e5e5e5"
            />
            <AnimatedCircle
              cx={width / 2}
              cy={height / 2}
              r={900 / (2 * Math.PI)}
              stroke={percentage! > 0.5 ? "#2dd4bf" : "#fcd34d"}
              strokeWidth={15}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedProps}
              strokeLinecap="round"
            />
          </Svg>
        </Flex>
      </Flex>
      <Flex flex={0.3} align="center" bg="muted.50">
        <Animated.View entering={SlideInUp.delay(300)}>
          <Heading
            size="2xl"
            fontFamily="Poppins_600SemiBold"
          >{`You got ${upCards} out of ${cardsInBoxLength}`}</Heading>
        </Animated.View>
        <Animated.View entering={SlideInUp.delay(2300)}>
          <Heading size="lg" mt={5} fontFamily="Poppins_600SemiBold">
            {percentage! < 0.5 ? "Try harder next time!" : "Well done!"}
          </Heading>
        </Animated.View>
      </Flex>
      <Flex flex={0.1} p={5} bg="muted.50">
        <Animated.View entering={SlideInDown.delay(2300)}>
          <CustomButton title="Continue" onPress={continueHandler} />
        </Animated.View>
      </Flex>
    </>
  );
};

export default StatsScreen;
