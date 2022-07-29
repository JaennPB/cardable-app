import { useEffect } from "react";
import { Button, Text } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { manageCard } from "../app/mainSlice";

import { doc, writeBatch } from "firebase/firestore";
import { db } from "../db/firebase";

import FlexScreen from "../components/UI/FlexScreen";
import { Alert } from "react-native";

const StatsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userId);

  const route = useRoute<RouteProp<NavParams, "StatsScreen">>();
  const itemsToUpdate = route.params.updatedItems;

  useEffect(() => {
    async function updateData() {
      try {
        const batch = writeBatch(db);

        itemsToUpdate.forEach((card) => {
          dispatch(manageCard({ cardId: card.cardId, type: card.type }));
          batch.update(doc(db, "users", userId, "cards", card.cardId), {
            currBox: card.newBox,
          });
        });

        await batch.commit();
      } catch {
        Alert.alert("Could not update data, please try again.");
      }
    }

    updateData();
  }, []);

  return (
    <FlexScreen>
      <Text>StatsScreen</Text>
      <Button onPress={() => navigation.navigate("BoxesScreen")}>
        Continue
      </Button>
    </FlexScreen>
  );
};

export default StatsScreen;
