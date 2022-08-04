import { Input, Text, VStack } from "native-base";
import { KeyboardTypeOptions } from "react-native";

interface Props {
  label: string;
  type: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
  autoCapitalize: "none" | "sentences";
  placeholder?: string;
  secureTextEntry?: boolean;
  isInvalid?: boolean;
  maxLength?: number;
}

const CustomInput: React.FC<Props> = ({
  label,
  placeholder,
  type,
  value,
  onChangeText,
  secureTextEntry,
  isInvalid,
  maxLength,
  autoCapitalize,
}) => {
  return (
    <VStack>
      <Text fontSize={18} mb={2} fontFamily="Poppins_400Regular">
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        variant="filled"
        size="2xl"
        p={5}
        mb={5}
        fontSize={20}
        color="black"
        keyboardType={type}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        borderColor={"danger.400"}
        borderWidth={isInvalid ? 1 : 0}
        borderRadius={20}
        _focus={{
          borderColor: "danger.400",
          bg: "teal.100",
        }}
        returnKeyType="done"
        maxLength={maxLength}
        fontFamily="Poppins_400Regular"
      />
    </VStack>
  );
};

export default CustomInput;
