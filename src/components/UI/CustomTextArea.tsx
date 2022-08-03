import { Text, VStack, Input, KeyboardAvoidingView } from "native-base";

interface Props {
  label: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

const CustomTextArea: React.FC<Props> = ({
  label,
  placeholder,
  onChangeText,
  value,
}) => {
  return (
    <VStack space={2}>
      <Text fontSize={20} fontFamily="Poppins_400Regular">
        {label}:
      </Text>
      <Input
        p={5}
        mb={5}
        placeholder={placeholder}
        variant="filled"
        size="2xl"
        autoCapitalize="sentences"
        multiline
        returnKeyType="default"
        h={220}
        borderRadius={20}
        _focus={{ bg: "teal.100" }}
        borderWidth={0}
        onChangeText={onChangeText}
        value={value}
        fontFamily="Poppins_400Regular"
      />
    </VStack>
  );
};

export default CustomTextArea;
