import { useLayoutEffect } from "react";
import { View, Button } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";

import { useRoute, RouteProp } from "@react-navigation/native";

import PlusButton from "../components/UI/PlusButton";

const FlashcardsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "FlashcardsScreen">>();
  const { deckName } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: deckName,
      headerRight: () => (
        <Button
          onPress={() => navigation.goBack()}
          _text={{ fontSize: 18, color: "danger.400" }}
          variant="ghost"
        >
          Close
        </Button>
      ),
    });
  }, []);

  function addCardToDeckHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ManageDataScreen", {
      type: "card",
      addCardFromDeck: deckName,
    });
  }

  return (
    <View flex={1} px={5} py={2} position="relative">
      <PlusButton onPress={addCardToDeckHandler} title="Add card" />
    </View>
  );
};

export default FlashcardsScreen;
