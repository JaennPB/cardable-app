import { useState } from "react";
import { Flex, Heading, Text, VStack } from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/UI/CustomInput";
import BoxContainer from "../../components/UI/BoxContainer";
import ToggleAuthType from "../../components/UI/ToggleAuthType";

interface Props {}

const LogInScreen: React.FC<Props> = ({}) => {
  const navigation = useAppNavigation();
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

  function signInHandler() {
    console.log("logging in");
    console.log(userData);
  }

  function navigateToSignUpHandler() {
    navigation.navigate("SignUpScreen");
  }

  return (
    <Flex flex={1} px={5} justify="center">
      <BoxContainer>
        <Heading mb={5}>Welcome back!</Heading>
        <VStack>
          <CustomInput
            label="Email"
            onChangeText={setDataHandler.bind(this, "email")}
            value={userData.email}
            autoCapitalize="none"
            type="email-address"
          />
          <CustomInput
            label="Password"
            secureTextEntry={true}
            onChangeText={setDataHandler.bind(this, "password")}
            value={userData.password}
            autoCapitalize="none"
            type="default"
          />
          <CustomButton title="Log In" onPress={signInHandler} />
        </VStack>
        <ToggleAuthType
          dividerTitle="I don't have an account"
          buttonTitle="Sign Up"
          onPress={navigateToSignUpHandler}
        />
      </BoxContainer>
    </Flex>
  );
};

export default LogInScreen;
