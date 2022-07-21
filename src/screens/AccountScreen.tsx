import { View } from "native-base";

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
    <View p={5} flex={1}>
      <CustomButton title="Log Out" onPress={logOutHandler} />
    </View>
  );
};

export default AccountScreen;
