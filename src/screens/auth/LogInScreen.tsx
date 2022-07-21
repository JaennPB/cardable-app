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
    console.log("signing in");
    console.log(userData);
  }

  function navigateToSignUpScreenHandler() {
    navigation.navigate("SignUpScreen");
  }

  return (
    <Flex flex={1} px={5} justify="center">
      <BoxContainer>
        <Flex>
          <Heading>Welcome Back!</Heading>
        </Flex>
        <VStack>
          <CustomInput
            label="Email"
            onChangeText={setDataHandler.bind(this, "email")}
            value={userData.email}
            autoCapitalize="none"
          />
          <CustomInput
            label="Password"
            secureTextEntry={true}
            onChangeText={setDataHandler.bind(this, "password")}
            value={userData.password}
            autoCapitalize="none"
          />
          <CustomButton title="Log In" onPress={signInHandler} />
        </VStack>
        <ToggleAuthType
          dividerTitle="I'm a new user"
          buttonTitle="Sign Up"
          onPress={navigateToSignUpScreenHandler}
        />
      </BoxContainer>
    </Flex>
  );
};

export default LogInScreen;
