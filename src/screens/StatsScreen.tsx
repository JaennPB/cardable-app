import { Button, Text } from "native-base";

import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppNavigation } from "../hooks/navigationHooks";

import FlexScreen from "../components/UI/FlexScreen";

const StatsScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const route = useRoute<RouteProp<NavParams, "StatsScreen">>();
  const itemsToUpdate = route.params.updatedItems;

  console.log(itemsToUpdate);

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
