import { useLayoutEffect } from "react";
import { View, Text } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";

import { useRoute, RouteProp } from "@react-navigation/native";

import PlusButton from "../components/UI/PlusButton";

const FlashcardsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "FlashcardsScreen">>();
  const { deckName, deckId } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: deckName,
    });
  }, []);

  function addCardToDeckHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ManageDataScreen", { type: "card" });
  }

  return (
    <View flex={1} px={5} py={2} position="relative">
      <Text>{deckId}</Text>
      <PlusButton onPress={addCardToDeckHandler} />
    </View>
  );
};

export default FlashcardsScreen;
