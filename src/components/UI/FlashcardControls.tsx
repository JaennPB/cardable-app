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
    <HStack space={2}>
      <Button
        onPress={onPressDowngrade}
        bg="danger.400"
        flex={1}
        borderRadius={20}
        colorScheme="danger"
      >
        <HStack space={2} alignItems="center">
          <Text fontSize={18} color="white" fontFamily="Poppins_600SemiBold">
            Nope
          </Text>
          <FontAwesome name="frown-o" size={24} color="white" />
        </HStack>
      </Button>
      <Button
        onPress={onPressStay}
        bg="amber.400"
        flex={1}
        borderRadius={20}
        colorScheme="amber"
      >
        <HStack space={2} alignItems="center">
          <Text fontSize={18} color="white" fontFamily="Poppins_600SemiBold">
            Not really
          </Text>
          <FontAwesome name="meh-o" size={24} color="white" />
        </HStack>
      </Button>

      <Button
        onPress={onPressUpgrade}
        bg="teal.400"
        flex={1}
        borderRadius={20}
        colorScheme="teal"
      >
        <HStack space={2} alignItems="center">
          <Text fontSize={18} color="white" fontFamily="Poppins_600SemiBold">
            Got it
          </Text>
          <FontAwesome name="smile-o" size={24} color="white" />
        </HStack>
      </Button>
    </HStack>
  );
};

export default FlashcardControls;
