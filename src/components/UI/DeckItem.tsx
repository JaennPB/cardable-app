import { Text, Pressable, Divider, View, HStack } from "native-base";
import { useAppSelector } from "../../hooks/reduxHooks";

interface Props {
  title: string;
  onPress: () => void;
  fromContext: "deck" | "box";
  deckId: string;
  boxId?: number;
}

const DeckItem: React.FC<Props> = ({
  title,
  onPress,
  deckId,
  fromContext,
  boxId,
}) => {
  const allCards = useAppSelector((state) => state.allCards);

  const cardsInDeck = allCards.filter((card) => card.from === deckId).length;
  // const cardsInBox = allCards.filter();

  const filteredCardsByBoxAndDeck = allCards.filter(
    (card) => card.currBox === boxId && card.from === deckId
  ).length;

  return (
    <View>
      <Pressable onPress={onPress} bg="blue.400" borderRadius={10} p={5} mb={5}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize={18} color="white" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize={16} color="white">
            {fromContext === "deck"
              ? `${cardsInDeck} cards`
              : `${filteredCardsByBoxAndDeck}/${cardsInDeck} cards`}
          </Text>
        </HStack>
      </Pressable>
      <Divider mb={5} />
    </View>
  );
};

export default DeckItem;
