import { Platform } from "react-native";
import { KeyboardAvoidingView } from "native-base";

const CustomKeyboardAV: React.FC = ({ children }) => {
  return (
    <KeyboardAvoidingView
      flex={1}
      p={5}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      justifyContent="center"
      alignItems="center"
      bg="muted.100"
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAV;
