import { Flex } from "native-base";

interface Props {
  children: React.ReactNode;
}

const FlexScreen: React.FC<Props> = ({ children }) => {
  return (
    <Flex bg="muted.100" flex={1} p={5}>
      {children}
    </Flex>
  );
};

export default FlexScreen;
