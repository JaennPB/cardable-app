import { View, TextArea, Text } from "native-base";

interface Props {
  label: string;
  placeholder: string;
}

const CustomTextArea: React.FC<Props> = ({ label, placeholder }) => {
  return (
    <View>
      <Text fontSize={18} mb={2}>
        {label}
      </Text>
      <TextArea
        placeholder={placeholder}
        p={5}
        mb={5}
        bg="muted.100"
        w="100%"
        h="auto"
        autoCompleteType
        fontSize={16}
        keyboardType="default"
      />
    </View>
  );
};

export default CustomTextArea;
