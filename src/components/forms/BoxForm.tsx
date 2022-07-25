import { useState } from "react";
import { Alert } from "react-native";
import { Heading, Text, Flex } from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { addBox } from "../../app/mainSlice";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

import CustomButton from "../UI/CustomButton";

const BoxForm: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const userId = useAppSelector((state) => state.userId);
  const boxesArr = useAppSelector((state) => state.boxes);

  async function addBoxHandler() {
    try {
      setIsLoading(true);
      const boxName = `Box ${boxesArr.length + 1}`;
      await setDoc(
        doc(
          db,
          "users",
          userId,
          "boxes",
          boxName.toLowerCase().replace(/\s/, "")
        ),
        {
          boxId: boxName.toLowerCase().replace(/\s/, ""),
          boxName: boxName,
        }
      );

      dispatch(addBox(boxName));
      setIsLoading(false);

      navigation.goBack();
    } catch {
      setIsLoading(false);
      Alert.alert(
        "Could not add box",
        "Problem with server, please try again."
      );
      navigation.goBack();
    }
  }

  return (
    <Flex bg="white" flex={1} p={5}>
      <Heading>Are you sure you want to add a new box?</Heading>
      <Text my={5}>
        By adding a new box you will another level to the Leitner system.
      </Text>
      <CustomButton
        title="Add box"
        onPress={addBoxHandler}
        isLoading={isLoading}
        isLoadingText="Adding box"
      />
    </Flex>
  );
};

export default BoxForm;
