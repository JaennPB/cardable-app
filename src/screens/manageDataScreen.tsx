import { useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { Flex, Button, KeyboardAvoidingView } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addBox, addDeck } from "../app/mainSlice";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../db/firebase";

import BoxForm from "../components/forms/BoxForm";
import DeckForm from "../components/forms/DeckForm";
import CardForm from "../components/forms/CardForm";

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
        boxName: boxName,
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
    <>
      {paramType === "box" && (
        <BoxForm onPress={addBoxHandler} isLoading={isLoading} />
      )}
      {paramType === "deck" && (
        <DeckForm
          onChangeText={setDeckName}
          onPress={addDeckHandler}
          value={deckName}
          isLoading={isLoading}
        />
      )}
      {paramType === "card" && (
        <CardForm isLoading={isLoading} onPress={() => {}} />
      )}
    </>
  );
};

export default ManageDataScreen;
