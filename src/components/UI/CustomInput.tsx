import { KeyboardTypeOptions } from "react-native";
import { Input, Text, VStack } from "native-base";

interface Props {
  label: string;
  type: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
  autoCapitalize: "none" | "sentences";
  placeholder?: string;
  secureTextEntry?: boolean;
  isInvalid: boolean;
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
      <Text fontSize={18} mb={2}>
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        variant="filled"
        size="2xl"
        p={5}
        mb={5}
        fontSize="xl"
        color="black"
        keyboardType={type}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        borderColor={"danger.400"}
        borderWidth={isInvalid ? 1 : 0}
        _focus={{
          borderColor: "danger.400",
        }}
        returnKeyType="done"
        maxLength={maxLength}
      />
    </VStack>
  );
};

export default CustomInput;