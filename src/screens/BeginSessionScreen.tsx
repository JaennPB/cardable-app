import { useLayoutEffect } from "react";
import { Button, Flex, Heading, ScrollView } from "native-base";

import * as Haptics from "expo-haptics";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import DeckItem from "../components/UI/DeckItem";
import FlexScreen from "../components/UI/FlexScreen";
import CustomButton from "../components/UI/CustomButton";

const BeginSessionScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "BeginSessionScreen">>();
  const { boxName, boxId } = route.params;

  const allDecks = useAppSelector((state) => state.allDecks);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: boxName });
  }, []);

  function beginActiveSessionHandler(deckId: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ActiveSessionScreen", {
      boxId: boxId,
      deckId: deckId,
    });
  }

  return (
    <FlexScreen>
      {allDecks.length <= 0 && (
        <Flex flex={1} justify="center" alignItems="center">
          <Heading textAlign="center" fontSize={18} mb={5}>
            Please begin by adding some decks from the deck screen or the button
            below.
          </Heading>
          <CustomButton
            title="Go to decks"
            onPress={() => navigation.navigate("DecksScreen")}
          />
        </Flex>
      )}
      {allDecks.map((deck, index) => (
        <ScrollView flex={1} key={index}>
          <Heading mb={5}>Choose a deck to study</Heading>
          <DeckItem
            key={deck.deckId + index}
            title={deck.deckName}
            onPress={beginActiveSessionHandler.bind(this, deck.deckId)}
          />
        </ScrollView>
      ))}
    </FlexScreen>
  );
};

export default BeginSessionScreen;
