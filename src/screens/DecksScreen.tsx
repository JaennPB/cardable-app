import { ListRenderItemInfo } from "react-native";
import { FlatList, Flex, Heading } from "native-base";

import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppSelector } from "../hooks/reduxHooks";

import PlusButton from "../components/UI/PlusButton";
import DeckItem from "../components/UI/DeckItem";

const DecksScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const decksData = useAppSelector((state) => state.allDecks);

  function navigateToDeckHandler(deckName: string) {
    navigation.navigate("FlashcardsScreen", {
      deckName: deckName,
    });
  }

  function addDeckHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    navigation.navigate("ManageDataScreen", { type: "deck" });
  }

  function renderDeckItemsHandler(itemData: ListRenderItemInfo<DeckObj>) {
    const item = itemData.item;

    return (
      <DeckItem
        key={item.deckId}
        title={item.deckName}
        onPress={() => navigateToDeckHandler(item.deckName)}
        deckId={item.deckId}
        fromContext="deck"
      />
    );
  }

  return (
    <Flex flex={1} p={5}>
      {decksData.length >= 1 && (
        <FlatList data={decksData} renderItem={renderDeckItemsHandler} />
      )}
      {decksData.length <= 0 && (
        <Flex flex={1} justify="center" alignItems="center">
          <Heading textAlign="center" fontSize={18}>
            Please begin by adding some decks.
          </Heading>
        </Flex>
      )}
      <PlusButton onPress={addDeckHandler} title="Add deck" />
    </Flex>
  );
};

export default DecksScreen;
