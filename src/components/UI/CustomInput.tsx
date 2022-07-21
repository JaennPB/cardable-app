import { KeyboardTypeOptions } from "react-native";
import { Input, Text, VStack } from "native-base";

interface Props {
  label: string;
  placeholder?: string;
  type?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  validationColor?: "darkBlue.600" | "danger.400";
  isInvalid?: boolean;
  maxLength?: number;
  autoCapitalize: "none" | "sentences";
}

const CustomInput: React.FC<Props> = ({
  label,
  placeholder,
  type,
  value,
  onChangeText,
  secureTextEntry,
  validationColor,
  isInvalid,
  maxLength,
  autoCapitalize,
}) => {
  return (
    <VStack space={2}>
      <Text>{label}</Text>
      <Input
        placeholder={placeholder}
        variant="filled"
        size="2xl"
        p={5}
        fontSize="xl"
        color="white"
        //   placeholderTextColor="darkBlue.400"
        //   selectionColor="darkBlue.400"
        keyboardType={type}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        borderColor={validationColor}
        borderWidth={isInvalid ? 1 : 0}
        //   _focus={{
        //     borderColor: validationColor,
        //     backgroundColor: "darkBlue.500",
        //   }}
        returnKeyType="done"
        maxLength={maxLength}
      />
    </VStack>
  );
};

export default CustomInput;
