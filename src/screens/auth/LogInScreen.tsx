import { useState } from "react";
import { Flex, Heading, Text, VStack } from "native-base";
import CustomButton from "../../components/UI/CustomButton";

import CustomInput from "../../components/UI/CustomInput";

interface Props {}

const LogInScreen: React.FC<Props> = ({}) => {
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

  return (
    <Flex flex={1}>
      <Flex>
        <Heading>Welcome!</Heading>
        <Text>Sign in to continue!</Text>
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
        <CustomButton title="Sign In" onPress={signInHandler} />
      </VStack>
    </Flex>
  );
};

export default LogInScreen;
