import { useLayoutEffect } from "react";
import { Button } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import DeckForm from "../components/forms/DeckForm";
import CardForm from "../components/forms/CardForm";

const ManageDataScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "ManageDataScreen">>();
  const { type, addCardFromDeck } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Add ${type}`,
      headerRight: () => (
        <Button
          onPress={() => navigation.goBack()}
          _text={{ fontSize: 18, color: "danger.400" }}
          variant="ghost"
        >
          Cancel
        </Button>
      ),
    });
  }, []);

  return (
    <>
      {type === "deck" && <DeckForm />}
      {type === "card" && <CardForm addCardfromDeck={addCardFromDeck!} />}
    </>
  );
};

export default ManageDataScreen;
