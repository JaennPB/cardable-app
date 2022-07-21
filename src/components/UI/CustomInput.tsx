import { KeyboardTypeOptions } from "react-native";
import { Input, FormControl, VStack } from "native-base";

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
    <FormControl isRequired>
      <VStack space={2}>
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          placeholder={placeholder}
          variant="filled"
          size="2xl"
          p={5}
          fontSize="xl"
          color="white"
          placeholderTextColor="darkBlue.400"
          selectionColor="darkBlue.400"
          keyboardType={type}
          backgroundColor="darkBlue.600"
          onChangeText={onChangeText}
          value={value}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          borderColor={validationColor}
          borderWidth={isInvalid ? 1 : 0}
          _focus={{
            borderColor: validationColor,
            backgroundColor: "darkBlue.500",
          }}
          returnKeyType="done"
          maxLength={maxLength}
        />
      </VStack>
    </FormControl>
  );
};

export default CustomInput;
