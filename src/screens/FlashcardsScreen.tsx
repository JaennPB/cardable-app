import { useLayoutEffect } from "react";
import { Pressable, View } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

const FlashcardsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "FlashcardsScreen">>();
  const deckId = route.params.deckId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Deck ${deckId}`,
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="close-sharp" size={30} color="red" />
        </Pressable>
      ),
    });
  });

  return <View></View>;
};

export default FlashcardsScreen;
