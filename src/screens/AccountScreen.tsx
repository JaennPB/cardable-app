import { Flex } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { logout } from "../app/mainSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

import CustomButton from "../components/UI/CustomButton";

const AccountScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  async function logOutHandler() {
    dispatch(logout());
    await AsyncStorage.removeItem("userId");
  }

  return (
    <Flex flex={1} p={5} pt={6} bg="muted.50" borderTopRadius={20}>
      <CustomButton title="Log out" onPress={logOutHandler} />
    </Flex>
  );
};

export default AccountScreen;
