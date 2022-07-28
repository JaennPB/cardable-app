import { HStack, Pressable, Text } from "native-base";

import { AntDesign } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  title: "Add deck" | "Add card";
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
        bg="#3a8ed3"
        py={2}
        pr={2}
        pl={3}
        borderRadius={50}
      >
        <Text fontSize={20} color="white">
          {title}
        </Text>
        <AntDesign name="pluscircle" size={35} color="white" />
      </HStack>
    </Pressable>
  );
};

export default PlusButton;
