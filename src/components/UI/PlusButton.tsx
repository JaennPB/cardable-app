import { Pressable } from "native-base";

import { AntDesign } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

const PlusButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} position="absolute" right={5} bottom={5}>
      <AntDesign name="pluscircle" size={50} color="#3a8ed3" />
    </Pressable>
  );
};

export default PlusButton;
