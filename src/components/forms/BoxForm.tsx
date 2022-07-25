import { Heading, Text, Flex } from "native-base";

import CustomButton from "../UI/CustomButton";

interface Props {
  onPress: () => void;
  isLoading: boolean;
}

const BoxForm: React.FC<Props> = ({ onPress, isLoading }) => {
  return (
    <Flex bg="white" flex={1} p={5}>
      <Heading>Are you sure you want to add a new box?</Heading>
      <Text my={5}>
        By adding a new box you will another level to the Leitner system.
      </Text>
      <CustomButton
        title="Add box"
        onPress={onPress}
        isLoading={isLoading}
        isLoadingText="Adding box"
      />
    </Flex>
  );
};

export default BoxForm;
