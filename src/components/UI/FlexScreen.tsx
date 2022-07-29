import { Flex } from "native-base";
import { Platform } from "react-native";

const FlexScreen: React.FC = ({ children }) => {
  return (
    <Flex bg="white" flex={1} p={5} pt={Platform.OS === "android" ? 70 : 5}>
      {children}
    </Flex>
  );
};

export default FlexScreen;
