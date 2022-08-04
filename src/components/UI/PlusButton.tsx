import { HStack, Pressable, Text } from "native-base";

import { AntDesign } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  title: "Add Deck" | "Add Card";
}

const PlusButton: React.FC<Props> = ({ onPress, title }) => {
  return (
    <Pressable
      onPress={onPress}
      position="absolute"
      right={5}
      bottom={5}
      flexDir="row"
    >
      <HStack
        space={2}
        alignItems="center"
        bg="teal.400"
        pl={4}
        p={3}
        borderRadius={30}
        shadow={4}
      >
        <Text fontSize={20} color="white" fontFamily="Poppins_400Regular">
          {title}
        </Text>
        <AntDesign name="pluscircle" size={35} color="white" />
      </HStack>
    </Pressable>
  );
};

export default PlusButton;
