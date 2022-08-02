import { useState } from "react";
import { Alert } from "react-native";
import { Divider, Heading, ScrollView, View } from "native-base";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { addCard } from "../../app/mainSlice";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

import CustomButton from "../UI/CustomButton";
import CustomTextArea from "../UI/CustomTextArea";
import FlexScreen from "../UI/FlexScreen";

interface Props {
  addCardfromDeck: string;
}

const CardForm: React.FC<Props> = ({ addCardfromDeck }) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userId);

  const [isLoading, setIsLoading] = useState(false);
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

  async function addCardHandler() {
    const cardId = Date.now().toString(36) + Math.random().toString(36);
    try {
      setIsLoading(true);
      const cardObj = {
        question: userData.question,
        answer: userData.answer,
        comment: userData.comment,
        from: addCardfromDeck,
        currBox: 1,
        id: cardId,
      };
      setDoc(doc(db, "users", userId, "cards", cardId), cardObj);

      dispatch(addCard(cardObj));
      setIsLoading(false);

      navigation.goBack();
    } catch {
      setIsLoading(false);
      Alert.alert("Could not add card", "Please try again");
      navigation.navigate("BoxesScreen");
    }
  }

  return (
    <FlexScreen>
      <ScrollView flex={1} bg="white">
        <View>
          <Heading mb={5} fontFamily="Poppins_600SemiBold">
            Front
          </Heading>
          <CustomTextArea
            label="Question"
            placeholder="i.e. Capital of Mexico"
            onChangeText={setDataHandler.bind(this, "question")}
            value={userData.question}
          />
          <Divider />
          <Heading my={5} fontFamily="Poppins_600SemiBold">
            Back
          </Heading>
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
            onPress={addCardHandler}
            isLoading={isLoading}
            isLoadingText="Adding card"
          />
        </View>
      </ScrollView>
    </FlexScreen>
  );
};

export default CardForm;
