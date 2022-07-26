import { useState } from "react";
import { Alert } from "react-native";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addDeck } from "../../app/mainSlice";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import FlexScreen from "../UI/FlexScreen";

const DeckForm: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userId);

  const [isLoading, setIsLoading] = useState(false);
  const [deckName, setDeckName] = useState("");

  async function addDeckHandler() {
    try {
      setIsLoading(true);
      setDoc(
        doc(
          db,
          "users",
          userId,
          "decks",
          deckName.toLowerCase().replace(/\s/, "")
        ),
        {
          deckId: deckName.toLowerCase().replace(/\s/, ""),
          deckName: deckName,
        }
      );

      dispatch(addDeck(deckName));
      setIsLoading(false);

      navigation.goBack();
    } catch {
      setIsLoading(false);
      Alert.alert("Could not add deck", "Please try again.");
      navigation.navigate("BoxesScreen");
    }
  }

  return (
    <FlexScreen>
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
        isLoadingText="Adding deck"
      />
    </FlexScreen>
  );
};

export default DeckForm;
