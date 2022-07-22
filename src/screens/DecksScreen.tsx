import { useLayoutEffect } from "react";
import { Button, View } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

const DecksScreen: React.FC = () => {
  const navigation = useAppNavigation();
  // const route = useRoute<RouteProp<NavParams, "DecksScreen">>();
  // const boxId = route.params?.boxId;

  // useLayoutEffect(() => {
  //   navigation.setOptions({ headerTitle: `Box ${boxId + 1}` });
  // });

  function navigateToDeckHandler(deckId: number) {
    navigation.navigate("FlashcardsScreen", { deckId: deckId });
  }

  return (
    <View px={5} py={2}>
      <Button mt={5} onPress={navigateToDeckHandler.bind(this, 1)}>
        Deck 1 (Test)
      </Button>
      <Button mt={5} onPress={navigateToDeckHandler.bind(this, 2)}>
        Deck 2 (Test)
      </Button>
    </View>
  );
};

export default DecksScreen;
