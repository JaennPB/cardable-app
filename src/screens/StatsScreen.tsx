import { useEffect } from "react";
import { Button, Text } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppDispatch } from "../hooks/reduxHooks";

import FlexScreen from "../components/UI/FlexScreen";
import { manageCard } from "../app/mainSlice";

const StatsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<NavParams, "StatsScreen">>();
  const itemsToUpdate = route.params.updatedItems;

  useEffect(() => {
    itemsToUpdate.forEach((doc) => {
      dispatch(manageCard({ cardId: doc.cardId, type: doc.type }));
    });
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
