import { Button, ScrollView, View } from "native-base";
import PlusButton from "../components/UI/PlusButton";

import { useAppNavigation } from "../hooks/navigationHooks";

const DecksScreen: React.FC = () => {
  const navigation = useAppNavigation();

  function navigateToDeckHandler(deckId: number) {
    navigation.navigate("FlashcardsScreen", { deckId: deckId });
  }

  function addDeckHandler() {
    navigation.navigate("ManageDataScreen", { type: "deck" });
  }

  return (
    <View flex={1} px={5} py={2} position="relative">
      <ScrollView>
        <Button mt={5} onPress={navigateToDeckHandler.bind(this, 1)}>
          Deck 1 (Test)
        </Button>
        <Button mt={5} onPress={navigateToDeckHandler.bind(this, 2)}>
          Deck 2 (Test)
        </Button>
      </ScrollView>
      <PlusButton onPress={addDeckHandler} />
    </View>
  );
};

export default DecksScreen;
