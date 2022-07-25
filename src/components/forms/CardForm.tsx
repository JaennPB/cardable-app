import { useState } from "react";
import {
  Divider,
  Heading,
  Flex,
  ScrollView,
  View,
  VStack,
  KeyboardAvoidingView,
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomButton from "../UI/CustomButton";
import CustomTextArea from "../UI/CustomTextArea";

interface Props {
  onPress: () => void;
  isLoading: boolean;
}

const CardForm: React.FC<Props> = ({ isLoading, onPress }) => {
  const [userData, setUserData] = useState({
    question: "",
    answer: "",
    comment: "",
  });

  function setDataHandler(identifier: string, enteredText: string) {
    setUserData((prevState) => ({
      ...prevState,
      [identifier]: enteredText,
    }));
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "white", padding: 20 }}
      extraScrollHeight={100}
      keyboardOpeningTime={50}
    >
      <View>
        <Heading mb={5}>Front</Heading>
        <CustomTextArea
          label="Question"
          placeholder="i.e. Capital of Mexico"
          onChangeText={setDataHandler.bind(this, "question")}
          value={userData.question}
        />
        <Divider />
        <Heading my={5}>Back</Heading>
        <CustomTextArea
          label="Answer"
          placeholder="i.e. Mexico City"
          onChangeText={setDataHandler.bind(this, "answer")}
          value={userData.answer}
        />
        <CustomTextArea
          label="Comment"
          placeholder="i.e. Population 8.8 million"
          onChangeText={setDataHandler.bind(this, "comment")}
          value={userData.comment}
        />
        <CustomButton
          title="Add Card"
          onPress={onPress}
          isLoading={isLoading}
          isLoadingText="Adding card"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CardForm;
