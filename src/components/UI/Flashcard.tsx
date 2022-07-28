import { Box, Button, Heading, View } from "native-base";
import { StyleSheet } from "react-native";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  question: string;
  answer: string;
}

const Flashcard: React.FC<Props> = ({ question, answer }) => {
  const rotateY = useSharedValue(0);

  function flipCardHandler() {
    rotateY.value = 180;
  }

  const rStylesFront = useAnimatedStyle(() => {
    const rotateFront = interpolate(rotateY.value, [0, 180], [0, 180]);

    return {
      transform: [{ rotateY: withTiming(`${rotateFront}deg`) }],
      zIndex: 10,
    };
  });

  const rStylesBack = useAnimatedStyle(() => {
    const rotateBack = interpolate(rotateY.value, [0, 180], [180, 360]);

    return {
      transform: [{ rotateY: withTiming(`${rotateBack}deg`) }],
    };
  });

  return (
    <View position="absolute">
      <Animated.View style={[styles.hidden, rStylesFront]}>
        <Box
          borderWidth={1}
          borderColor="#ccc"
          bg="white"
          shadow="1"
          h={500}
          w={330}
          borderRadius={25}
          justifyContent="space-between"
          alignItems="center"
          p={5}
          pt={10}
        >
          <Heading>{question}</Heading>
          <Button
            variant="ghost"
            onPress={flipCardHandler}
            borderRadius={50}
            w="50%"
            zIndex={20}
            _text={{ fontSize: 20, color: "blue.500" }}
          >
            Flip
          </Button>
        </Box>
      </Animated.View>
      <Animated.View style={[styles.backCard, styles.hidden, rStylesBack]}>
        <Box
          borderWidth={1}
          borderColor="#ccc"
          bg="white"
          shadow="1"
          h={500}
          w={330}
          borderRadius={25}
          justifyContent="space-between"
          alignItems="center"
          p={5}
          pt={10}
        >
          <Heading>{answer}</Heading>
        </Box>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    backfaceVisibility: "hidden",
  },
  backCard: {
    position: "absolute",
    top: 0,
  },
});

export default Flashcard;
