import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppDispatch } from "../hooks/reduxHooks";

import { logout } from "../app/mainSlice";

import CustomButton from "../components/UI/CustomButton";
import FlexScreen from "../components/UI/FlexScreen";

const AccountScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  async function logOutHandler() {
    dispatch(logout());
    await AsyncStorage.removeItem("userId");
  }

  return (
    <FlexScreen>
      <CustomButton title="Log Out" onPress={logOutHandler} />
    </FlexScreen>
  );
};

export default AccountScreen;
