import { Flex } from "native-base";

const FlexScreen: React.FC = ({ children }) => {
  return (
    <Flex bg="white" flex={1} p={5}>
      {children}
    </Flex>
  );
};

export default FlexScreen;
