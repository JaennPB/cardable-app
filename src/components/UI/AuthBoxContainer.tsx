import { View } from "native-base";

const AuthBoxContainer: React.FC = ({ children }) => {
  return (
    <View bg="white" p={5} borderRadius={10} w="100%" shadow={3}>
      {children}
    </View>
  );
};

export default AuthBoxContainer;
