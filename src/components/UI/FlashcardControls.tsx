import { Button, Flex } from "native-base";

interface Props {
  onPressGotIt: () => void;
  onPressSkip: () => void;
  onPressNope: () => void;
}

const FlashcardControls: React.FC<Props> = ({
  onPressGotIt,
  onPressNope,
  onPressSkip,
}) => {
  return (
    <Flex flexDir="row" mt={5}>
      <Button
        onPress={onPressSkip}
        bg="danger.400"
        flex={1}
        borderRadius={50}
        _text={{ fontSize: 18 }}
      >
        Nope
      </Button>
      <Button
        onPress={onPressNope}
        bg="darkBlue.300"
        flex={1}
        mx={2}
        borderRadius={50}
        _text={{ fontSize: 18 }}
      >
        Skip
      </Button>
      <Button
        onPress={onPressGotIt}
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
