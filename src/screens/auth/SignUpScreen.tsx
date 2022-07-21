import { useState } from "react";
import { Flex, Heading, VStack, Text } from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/UI/CustomInput";
import BoxContainer from "../../components/UI/BoxContainer";
import ToggleAuthType from "../../components/UI/ToggleAuthType";

interface Props {}

const SignUpScreen: React.FC<Props> = ({}) => {
  const navigation = useAppNavigation();
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

  function signInHandler() {
    console.log("signing in");
    console.log(userData);
  }

  function navigateToLogInScreenHandler() {
    navigation.navigate("LogInScreen");
  }
  return (
    <Flex flex={1} px={5} justify="center">
      <BoxContainer>
        <Flex>
          <Heading>Welcome to Cardable!</Heading>
          <Text>Create a free account to continue!</Text>
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
          <CustomInput
            label="Re-enter Password"
            secureTextEntry={true}
            onChangeText={setDataHandler.bind(this, "password2")}
            value={userData.password2}
            autoCapitalize="none"
          />
          <CustomButton title="Sign Up" onPress={signInHandler} />
        </VStack>
        <ToggleAuthType
          dividerTitle="Or"
          buttonTitle="Log In"
          onPress={navigateToLogInScreenHandler}
        />
      </BoxContainer>
    </Flex>
  );
};

export default SignUpScreen;
