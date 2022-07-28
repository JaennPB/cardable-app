import { Button, Flex } from "native-base";

interface Props {
  onPressDowngrade: () => void;
  onPressSkip: () => void;
  onPressUpgrade: () => void;
}

const FlashcardControls: React.FC<Props> = ({
  onPressDowngrade,
  onPressSkip,
  onPressUpgrade,
}) => {
  return (
    <Flex flexDir="row" mt={5}>
      <Button
        onPress={onPressDowngrade}
        bg="danger.400"
        flex={1}
        borderRadius={50}
        _text={{ fontSize: 18 }}
      >
        Nope
      </Button>
      <Button
        onPress={onPressSkip}
        bg="darkBlue.300"
        flex={1}
        mx={2}
        borderRadius={50}
        _text={{ fontSize: 18 }}
      >
        Skip
      </Button>
      <Button
        onPress={onPressUpgrade}
        bg="success.400"
        flex={1}
        borderRadius={50}
        _text={{ fontSize: 18 }}
      >
        Got it
      </Button>
    </Flex>
  );
};

export default FlashcardControls;
