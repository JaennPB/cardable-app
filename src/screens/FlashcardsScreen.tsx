import { useLayoutEffect } from "react";
import { View, Button, ScrollView, Text, Pressable, HStack } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppSelector } from "../hooks/reduxHooks";

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
          <Pressable
            key={index}
            bg="#3a8ed3"
            py={2}
            px={5}
            mb={5}
            borderRadius={15}
          >
            <Text color="white" fontSize={20} fontWeight="semibold">
              Question:
            </Text>
            <Text color="white" fontSize={18}>
              {card.question}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <PlusButton onPress={addCardToDeckHandler} title="Add card" />
    </View>
  );
};

export default FlashcardsScreen;
