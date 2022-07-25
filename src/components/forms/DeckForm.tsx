import { Flex } from "native-base";

import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";

interface Props {
  onChangeText: (text: string) => void;
  onPress: () => void;
  value: string;
  isLoading: boolean;
}

const DeckForm: React.FC<Props> = ({
  value,
  isLoading,
  onChangeText,
  onPress,
}) => {
  return (
    <Flex bg="white" flex={1} p={5}>
      <CustomInput
        autoCapitalize="sentences"
        label="Deck name"
        type="default"
        placeholder="i.e. Capital cities"
        onChangeText={onChangeText}
        value={value}
      />
      <CustomButton
        title="Add Deck"
        onPress={onPress}
        isLoading={isLoading}
        isLoadingText="Adding deck"
      />
    </Flex>
  );
};

export default DeckForm;
