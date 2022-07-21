import { useLayoutEffect } from "react";
import { View, Text } from "react-native";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

const ManageDataScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "ManageDataScreen">>();
  const paramType = route.params.type;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `Add ${paramType}` });
  }, []);

  return (
    <View>
      <Text>ManageDataScreen</Text>
    </View>
  );
};

export default ManageDataScreen;
