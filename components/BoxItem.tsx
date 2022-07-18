import { Dimensions } from "react-native";
import { View, Text } from "native-base";

interface Props {
  title: string;
  index: number;
}

const { width } = Dimensions.get("window");

const BoxItem: React.FC<Props> = ({ title, index }) => {
  return (
    <View
      key={index}
      w={width * 0.7}
      bg="red.100"
      borderRadius={30}
      justifyContent="center"
      alignItems="center"
    >
      <Text>{title}</Text>
    </View>
  );
};

export default BoxItem;
