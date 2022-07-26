import { Text, Pressable, Divider, Box, View } from "native-base";

interface Props {
  title: string;
  onPress: () => void;
}

const DeckItem: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View position="relative">
      <Pressable onPress={onPress} bg="blue.400" borderRadius={10} p={5} mb={5}>
        <Text fontSize={18} color="white" fontWeight="semibold">
          {title}
        </Text>
      </Pressable>
      <Divider mb={5} />
    </View>
  );
};

export default DeckItem;
