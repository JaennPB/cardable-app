import { Button, Flex } from "native-base";

interface Props {
  onPress: () => void;
}

const FlashcardControls: React.FC<Props> = ({ onPress }) => {
  // flip
  // got it, nope, mark, skip

  return (
    <Flex>
      <Button onPress={onPress}>Flip</Button>
    </Flex>
  );
};

export default FlashcardControls;
