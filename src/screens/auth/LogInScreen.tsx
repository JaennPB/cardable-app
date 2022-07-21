import { useState } from "react";
import { Alert } from "react-native";
import { Heading, VStack } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { auth } from "../../db/firebase";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";

import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/UI/CustomInput";
import BoxContainer from "../../components/UI/BoxContainer";
import ToggleAuthType from "../../components/UI/ToggleAuthType";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate } from "../../app/mainSlice";
import CustomKeyboardAV from "../../components/UI/CustomKeyboardAV";

interface Props {}

const LogInScreen: React.FC<Props> = ({}) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPassworIsInvalid] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function setDataHandler(identifier: string, enteredText: string) {
    setUserData((prevState) => {
      return {
        ...prevState,
        [identifier]: enteredText,
      };
    });
  }

  async function signInHandler() {
    try {
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const userId = response.user.uid;

      AsyncStorage.setItem("userId", userId);

      setIsLoading(false);

      dispatch(authenticate(userId));
    } catch (error: any) {
      let errorMessage1: string;
      let errorMessage2: string;

      if (error.code === "auth/invalid-email") {
        errorMessage1 = "Invalid email!";
        errorMessage2 = "Please try again. 📩";
        setUserData({ ...userData, email: "" });
        setEmailIsInvalid(true);
      }
      if (error.code === "auth/wrong-password") {
        errorMessage1 = "Wrong password!";
        errorMessage2 = "Please try again. 🔑";
        setUserData({ ...userData, password: "" });
        setPassworIsInvalid(true);
      }
      if (error.code === "auth/user-not-found") {
        errorMessage1 = "User not found!";
        errorMessage2 = "Please try signing up 😉";
        setUserData({ password: "", email: "" });
        setEmailIsInvalid(true);
      }
      Alert.alert(errorMessage1!, errorMessage2!);
      setIsLoading(false);
    }
  }

  function navigateToSignUpHandler() {
    navigation.navigate("SignUpScreen");
  }

  return (
    <CustomKeyboardAV>
      <BoxContainer>
        <Heading mb={5}>Welcome back!</Heading>
        <VStack>
          <CustomInput
            label="Email"
            onChangeText={setDataHandler.bind(this, "email")}
            value={userData.email}
            autoCapitalize="none"
            type="email-address"
            isInvalid={emailIsInvalid}
          />
          <CustomInput
            label="Password"
            secureTextEntry={true}
            onChangeText={setDataHandler.bind(this, "password")}
            value={userData.password}
            autoCapitalize="none"
            type="default"
            isInvalid={passwordIsInvalid}
          />
          <CustomButton
            title="Log In"
            onPress={signInHandler}
            isLoading={isLoading}
            isLoadingText="Logging in"
          />
        </VStack>
        <ToggleAuthType
          dividerTitle="I don't have an account"
          buttonTitle="Sign Up"
          onPress={navigateToSignUpHandler}
        />
      </BoxContainer>
    </CustomKeyboardAV>
  );
};

export default LogInScreen;
