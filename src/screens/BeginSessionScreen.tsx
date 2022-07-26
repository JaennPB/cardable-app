import { useLayoutEffect } from "react";
import { Heading } from "native-base";

import * as Haptics from "expo-haptics";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import DeckItem from "../components/UI/DeckItem";
import FlexScreen from "../components/UI/FlexScreen";

const BeginSessionScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "BeginSessionScreen">>();
  const { boxName } = route.params;
  const boxId = boxName.toLowerCase().replace(/\s/, "");

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
      <Heading mb={5}>Choose a deck to study</Heading>
      {allDecks.map((deck, index) => (
        <DeckItem
          key={deck.deckId + index}
          title={deck.deckName}
          onPress={beginActiveSessionHandler.bind(this, deck.deckId)}
        />
      ))}
    </FlexScreen>
  );
};

export default BeginSessionScreen;
