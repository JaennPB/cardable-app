import { Button, Text } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";

import FlexScreen from "../components/UI/FlexScreen";

const StatsScreen: React.FC = () => {
  const navigation = useAppNavigation();
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
