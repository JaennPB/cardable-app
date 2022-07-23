import { Button, ScrollView, View } from "native-base";
import PlusButton from "../components/UI/PlusButton";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppSelector } from "../hooks/reduxHooks";

const DecksScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const decksData = useAppSelector((state) => state.decks);

  function navigateToDeckHandler(deckId: number) {
    navigation.navigate("FlashcardsScreen", { deckId: deckId });
  }

  function addDeckHandler() {
    navigation.navigate("ManageDataScreen", { type: "deck" });
  }

  return (
    <View flex={1} px={5} py={2} position="relative">
      <ScrollView>
        {decksData.map((deck, index) => (
          <Button
            key={index}
            mt={5}
            onPress={navigateToDeckHandler.bind(this, index)}
          >
            {deck.deckName}
          </Button>
        ))}
      </ScrollView>
      <PlusButton onPress={addDeckHandler} />
    </View>
  );
};

export default DecksScreen;
