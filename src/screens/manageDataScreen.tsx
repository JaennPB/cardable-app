import { useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { Flex, Text, Heading, Button } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addBox, addDeck } from "../app/mainSlice";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../db/firebase";

import CustomInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";

const ManageDataScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [deckName, setDeckName] = useState("");

  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "ManageDataScreen">>();
  const paramType = route.params.type;

  const userId = useAppSelector((state) => state.userId);
  const boxesArr = useAppSelector((state) => state.boxes);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Add ${paramType}`,
      headerRight: () => (
        <Button
          onPress={cancelAddingHandler}
          _text={{ fontSize: 18, color: "danger.400" }}
          variant="ghost"
        >
          Cancel
        </Button>
      ),
    });
  }, []);

  function cancelAddingHandler() {
    navigation.goBack();
  }

  async function addBoxHandler() {
    try {
      setIsLoading(true);
      const boxName = `Box ${boxesArr.length + 1}`;
      await setDoc(doc(db, "users", userId, "boxes", `${boxName}`), {
        boxName: `Box ${boxName}`,
      });

      dispatch(addBox(boxName));
      setIsLoading(false);

      navigation.goBack();
    } catch {
      Alert.alert(
        "Could not add box",
        "Problem with server, please try again."
      );
    }
  }

  async function addDeckHandler() {
    try {
      setIsLoading(true);
      addDoc(collection(db, "users", userId, "decks"), { deckName: deckName });

      dispatch(addDeck(deckName));
      navigation.goBack();
    } catch {}
  }

  return (
    <Flex bg="white" flex={1} p={5}>
      {paramType === "box" && (
        <>
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
        </>
      )}
      {paramType === "deck" && (
        <>
          <CustomInput
            autoCapitalize="sentences"
            label="Deck name"
            type="default"
            placeholder="i.e. Capital cities"
            onChangeText={setDeckName}
            value={deckName}
          />
          <CustomButton
            title="Add Deck"
            onPress={addDeckHandler}
            isLoading={isLoading}
            isLoadingText="Adding box"
          />
        </>
      )}
    </Flex>
  );
};

export default ManageDataScreen;
