import { useLayoutEffect } from "react";
import { View, Button, ScrollView, Text } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import { useRoute, RouteProp } from "@react-navigation/native";

import PlusButton from "../components/UI/PlusButton";

const FlashcardsScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<NavParams, "FlashcardsScreen">>();
  const { deckName } = route.params;
  const deckId = deckName.toLowerCase().replace(/\s/, "");

  const filteredCards = useAppSelector((state) => state.allCards).filter(
    (card) => card.from === deckId
  );

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
      addCardFromDeck: deckId,
    });
  }

  return (
    <View flex={1} px={5} py={2} position="relative">
      <ScrollView>
        {filteredCards.map((card, index) => (
          <Text key={index}>{card.question}</Text>
        ))}
      </ScrollView>
      <PlusButton onPress={addCardToDeckHandler} title="Add card" />
    </View>
  );
};

export default FlashcardsScreen;
