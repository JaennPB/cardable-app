import { Button } from "native-base";
import { useLayoutEffect } from "react";

import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import CardForm from "../components/forms/CardForm";
import DeckForm from "../components/forms/DeckForm";

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
          _text={{
            fontSize: 18,
            color: "danger.400",
            fontFamily: "Poppins_400Regular",
          }}
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
