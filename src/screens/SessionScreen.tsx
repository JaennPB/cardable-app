import { useLayoutEffect } from "react";
import { View, Heading, Button } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

const SessionScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "SessionScreen">>();
  const { boxId } = route.params;

  const allDecks = useAppSelector((state) => state.allDecks);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: boxId });
  }, []);

  return (
    <View flex={1} px={5} py={2}>
      <Heading mb={5}>Choose a deck to study</Heading>
      {allDecks.map((deck) => (
        <Button mb={2}>{deck.deckName}</Button>
      ))}
    </View>
  );
};

export default SessionScreen;
