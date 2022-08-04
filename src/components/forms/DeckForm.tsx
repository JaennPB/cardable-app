import { Flex } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { addDeck } from "../../app/mainSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";

const DeckForm: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userId);

  const [isLoading, setIsLoading] = useState(false);
  const [deckName, setDeckName] = useState("");

  async function addDeckHandler() {
    const deckId = deckName.toLowerCase().replace(/\s/g, "").trim();
    const deck = deckName.trim();

    if (!deckName) return;

    try {
      setIsLoading(true);
      setDoc(doc(db, "users", userId, "decks", deckId), {
        deckId: deckId,
        deckName: deck,
      });

      dispatch(addDeck(deck));
      setIsLoading(false);

      navigation.replace("FlashcardsScreen", { deckName: deck });
    } catch {
      setIsLoading(false);
      Alert.alert("Could not add deck", "Please try again.");
      navigation.navigate("BoxesScreen");
    }
  }

  return (
    <Flex flex={1} bg="white" p={5}>
      <CustomInput
        autoCapitalize="sentences"
        label="Deck name"
        type="default"
        placeholder="i.e. Capital cities"
        onChangeText={setDeckName}
        value={deckName}
        maxLength={20}
      />
      <CustomButton
        title="Add Deck"
        onPress={addDeckHandler}
        isLoading={isLoading}
        isLoadingText="Adding deck"
      />
    </Flex>
  );
};

export default DeckForm;
