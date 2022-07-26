import { useLayoutEffect } from "react";
import { Button, ScrollView, Text } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import FlexScreen from "../components/UI/FlexScreen";
import { Alert } from "react-native";

const ActiveSessionScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<NavParams, "ActiveSessionScreen">>();
  const { boxId, deckId } = route.params;

  const allCards = useAppSelector((state) => state.allCards);
  const filteredCardsByBoxAndDeck = allCards.filter(
    (card) => card.currBox === boxId && card.from === deckId
  );

  function endSessionHandler() {
    Alert.alert(
      "Are you sure you want to end your session?",
      "There are still some flashcards left on this box.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "default",
        },
        {
          text: "End session",
          onPress: () => navigation.navigate("StatsScreen"),
          style: "destructive",
        },
      ]
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant="ghost"
          _text={{ fontSize: 18, color: "danger.400" }}
          onPress={endSessionHandler}
        >
          End session
        </Button>
      ),
    });
  }, []);

  return (
    <FlexScreen>
      <ScrollView>
        {filteredCardsByBoxAndDeck.map((card, index) => (
          <Text key={index}>{card.question}</Text>
        ))}
      </ScrollView>
    </FlexScreen>
  );
};

export default ActiveSessionScreen;
