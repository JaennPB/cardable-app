import { VStack } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../app/mainSlice";

import CustomButton from "../components/UI/CustomButton";

const AccountScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  async function logOutHandler() {
    dispatch(logout());
    await AsyncStorage.removeItem("userId");
  }

  return (
    <VStack flex={1} p={5} space={5}>
      <CustomButton title="Log Out" onPress={logOutHandler} />
    </VStack>
  );
};

export default AccountScreen;
