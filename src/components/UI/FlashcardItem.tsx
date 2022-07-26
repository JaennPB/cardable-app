import { Text, Pressable, Divider } from "native-base";
import React from "react";

interface Props {
  questionSnippet: string;
  onPress: () => void;
}

const FlashcardItem: React.FC<Props> = ({ questionSnippet, onPress }) => {
  return (
    <>
      <Pressable onPress={onPress} bg="blue.400" borderRadius={10} p={5} mb={5}>
        <Text color="white" fontSize={18} fontWeight="semibold">
          Question:
        </Text>
        <Text color="white" fontSize={16}>
          {questionSnippet}
        </Text>
      </Pressable>
      <Divider mb={5} />
    </>
  );
};

export default FlashcardItem;
