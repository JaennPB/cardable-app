import {
  Divider,
  Heading,
  TextArea,
  Text,
  ScrollView,
  View,
} from "native-base";
import { KeyboardAvoidingView } from "react-native";

import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import CustomTextArea from "../UI/CustomTextArea";

interface Props {
  onChangeText: (text: string) => void;
  onPress: () => void;
  value: string;
  isLoading: boolean;
}

const CardForm: React.FC<Props> = ({
  isLoading,
  onChangeText,
  onPress,
  value,
}) => {
  return (
    <ScrollView>
      <View>
        <Heading mb={5}>Front</Heading>
        <CustomTextArea label="Question" placeholder="i.e. Capital of Mexico" />
      </View>
      <Divider my={2} />
      <View>
        <Heading my={5}>Back</Heading>
        <CustomTextArea label="Answer" placeholder="i.e. Mexico City" />
        <CustomTextArea
          label="Comment"
          placeholder="i.e. Population 8.8 million"
        />
      </View>

      <CustomButton
        title="Add Card"
        onPress={onPress}
        isLoading={isLoading}
        isLoadingText="Adding card"
      />
    </ScrollView>
  );
};

export default CardForm;
