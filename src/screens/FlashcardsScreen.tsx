import { useLayoutEffect } from "react";
import { Pressable, View, Text } from "native-base";

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
          <Text fontSize={16} color="danger.400">
            End Session
          </Text>
        </Pressable>
      ),
    });
  });

  return <View px={5} py={2}></View>;
};

export default FlashcardsScreen;
