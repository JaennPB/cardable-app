import { View } from "native-base";

const BoxContainer: React.FC = ({ children }) => {
  return (
    <View bg="white" p={5} borderRadius={5} w="100%">
      {children}
    </View>
  );
};

export default BoxContainer;
