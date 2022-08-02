import { Text, VStack, Input } from "native-base";

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
    <VStack>
      <Text fontSize={18} mb={2} fontFamily="Poppins_400Regular">
        {label}
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
        maxH={150}
        onChangeText={onChangeText}
        value={value}
        fontFamily="Poppins_400Regular"
      />
    </VStack>
  );
};

export default CustomTextArea;
