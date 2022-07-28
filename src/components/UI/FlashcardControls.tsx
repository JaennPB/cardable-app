import { Button, HStack, Text } from "native-base";

import { FontAwesome } from "@expo/vector-icons";

interface Props {
  onPressDowngrade: () => void;
  onPressUpgrade: () => void;
  onPressStay: () => void;
}

const FlashcardControls: React.FC<Props> = ({
  onPressDowngrade,
  onPressUpgrade,
  onPressStay,
}) => {
  return (
    <HStack mt={5} space={2}>
      <Button
        onPress={onPressDowngrade}
        bg="danger.400"
        flex={1}
        borderRadius={50}
      >
        <HStack space={2} alignItems="center">
          <Text fontSize={18} color="white">
            Nope
          </Text>
          <FontAwesome name="frown-o" size={24} color="white" />
        </HStack>
      </Button>
      <Button onPress={onPressStay} bg="amber.400" flex={1} borderRadius={50}>
        <HStack space={2} alignItems="center">
          <Text fontSize={18} color="white">
            Not really
          </Text>
          <FontAwesome name="meh-o" size={24} color="white" />
        </HStack>
      </Button>

      <Button
        onPress={onPressUpgrade}
        bg="success.400"
        flex={1}
        borderRadius={50}
      >
        <HStack space={2} alignItems="center">
          <Text fontSize={18} color="white">
            Got it
          </Text>
          <FontAwesome name="smile-o" size={24} color="white" />
        </HStack>
      </Button>
    </HStack>
  );
};

export default FlashcardControls;
