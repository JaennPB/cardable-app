import { useState } from "react";
import { Alert } from "react-native";
import { Flex, Heading, VStack, Text } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppNavigation } from "../../hooks/navigationHooks";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { authenticate } from "../../app/mainSlice";

import { auth, db } from "../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth/react-native";
import { setDoc, doc } from "firebase/firestore";

import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/UI/CustomInput";
import BoxContainer from "../../components/UI/BoxContainer";
import ToggleAuthType from "../../components/UI/ToggleAuthType";
import CustomKeyboardAV from "../../components/UI/CustomKeyboardAV";

interface Props {}

const SignUpScreen: React.FC<Props> = ({}) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPassworIsInvalid] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  function setDataHandler(identifier: string, enteredText: string) {
    setUserData((prevState) => {
      return {
        ...prevState,
        [identifier]: enteredText,
      };
    });
  }

  async function SignUpHandler() {
    try {
      setIsLoading(true);

      if (userData.password !== userData.password2) {
        Alert.alert("Passwords don't match! 🔑");
        setPassworIsInvalid(true);
        setIsLoading(false);
        return;
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password2
      );
      const userId = response.user.uid;
      await setDoc(doc(db, "users", userId), {
        data: {},
      });

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
      if (error.code === "auth/weak-password") {
        errorMessage1 = "Password must be at least 6 characters! ";
        errorMessage2 = "Please try again. 🔑";
        setUserData({ ...userData, password: "", password2: "" });
        setPassworIsInvalid(true);
      }
      if (error.code === "auth/email-already-in-use") {
        errorMessage1 = "Email already in use";
        errorMessage2 = "Please try a diferent one! 🤯";
        setUserData({ ...userData, email: "" });
        setEmailIsInvalid(true);
      }

      Alert.alert(errorMessage1!, errorMessage2!);
      setIsLoading(false);
    }
  }

  function navigateToLogInHandler() {
    navigation.navigate("LogInScreen");
  }

  return (
    <CustomKeyboardAV>
      <BoxContainer>
        <VStack mb={5} space={2}>
          <Heading>Welcome to Cardable.</Heading>
          <Text>Create a free account to continue!</Text>
        </VStack>
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
          <CustomInput
            label="Re-enter Password"
            secureTextEntry={true}
            onChangeText={setDataHandler.bind(this, "password2")}
            value={userData.password2}
            autoCapitalize="none"
            type="default"
            isInvalid={passwordIsInvalid}
          />
          <CustomButton
            title="Sign Up"
            onPress={SignUpHandler}
            isLoading={isLoading}
            isLoadingText="Signing up"
          />
        </VStack>
        <ToggleAuthType
          dividerTitle="I already have an account"
          buttonTitle="Log In"
          onPress={navigateToLogInHandler}
        />
      </BoxContainer>
    </CustomKeyboardAV>
  );
};

export default SignUpScreen;
