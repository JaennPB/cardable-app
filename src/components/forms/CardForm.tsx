import { useState } from "react";
import { Alert } from "react-native";
import { Flex, Heading, KeyboardAvoidingView } from "native-base";

import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

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
  const [dataVisible, setDataVisible] = useState<
    "question" | "answer" | "comments"
  >("question");
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

  function nextItemHandler(dataToShow: "answer" | "comments") {
    if (dataToShow === "answer" && !userData.question) return;
    if (dataToShow === "comments" && !userData.answer) return;
    setDataVisible(dataToShow);
  }

  const QuestionData = (
    <Animated.View entering={SlideInRight.delay(500)} exiting={SlideOutLeft}>
      <Heading mb={5} fontFamily="Poppins_600SemiBold">
        Front of flashcard
      </Heading>
      <CustomTextArea
        label="Question"
        placeholder="i.e. Capital of France"
        onChangeText={setDataHandler.bind(this, "question")}
        value={userData.question}
      />
      <CustomButton
        title="Next"
        onPress={nextItemHandler.bind(this, "answer")}
      />
    </Animated.View>
  );

  const AnswerData = (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
      <Heading mb={5} fontFamily="Poppins_600SemiBold">
        Back of flashcard
      </Heading>
      <CustomTextArea
        label="Answer"
        placeholder="i.e. Paris"
        onChangeText={setDataHandler.bind(this, "answer")}
        value={userData.answer}
      />
      <CustomButton
        title="Next"
        onPress={nextItemHandler.bind(this, "comments")}
      />
    </Animated.View>
  );

  const CommentsData = (
    <Animated.View entering={SlideInRight}>
      <Heading mb={5} fontFamily="Poppins_600SemiBold">
        Back of flashcard
      </Heading>
      <CustomTextArea
        label="Comment (optional)"
        placeholder="i.e. Population 2.1 million"
        onChangeText={setDataHandler.bind(this, "comment")}
        value={userData.comment}
      />
      <CustomButton title="Submit" onPress={addCardHandler} />
    </Animated.View>
  );

  return (
    <Flex flex={1} bg="white" p={5}>
      {dataVisible === "question" && QuestionData}
      {dataVisible === "answer" && AnswerData}
      {dataVisible === "comments" && CommentsData}
    </Flex>
  );
};

export default CardForm;
