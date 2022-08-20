import { FlatList, Flex, Heading } from "native-base";
import { useLayoutEffect } from "react";
import { ListRenderItemInfo } from "react-native";

import * as Haptics from "expo-haptics";

import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppNavigation } from "../hooks/navigationHooks";

import { useAppSelector } from "../hooks/reduxHooks";

import CustomButton from "../components/UI/CustomButton";
import DeckItem from "../components/UI/DeckItem";

const BeginSessionScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "BeginSessionScreen">>();
  const { boxName, boxId } = route.params;

  const allDecks = useAppSelector((state) => state.allDecks);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: boxName });
  }, []);

  function beginActiveSessionHandler(deckId: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ActiveSessionScreen", {
      boxId: boxId,
      deckId: deckId,
    });
  }

  function renderDeckItemsHandler(itemData: ListRenderItemInfo<DeckObj>) {
    const item = itemData.item;

    return (
      <DeckItem
        key={item.deckId}
        title={item.deckName}
        onPress={() => beginActiveSessionHandler(item.deckId)}
        deckId={item.deckId}
        fromContext="box"
        boxId={boxId}
        index={itemData.index}
      />
    );
  }

  return (
    <Flex flex={1} bg="muted.50">
      {allDecks.length <= 0 && (
        <Flex flex={1} justify="center" alignItems="center">
          <Heading textAlign="center" fontSize={18} mb={5}>
            Please begin by adding some decks from the decks screen.
          </Heading>
          <CustomButton
            title="Go to decks"
            onPress={() => navigation.navigate("DecksScreen")}
          />
        </Flex>
      )}
      {allDecks.length > 0 && (
        <>
          <Heading
            my={5}
            ml={5}
            fontFamily="Poppins_600SemiBold"
            fontWeight="normal"
          >
            Choose a deck to study
          </Heading>
          <FlatList data={allDecks} renderItem={renderDeckItemsHandler} />
        </>
      )}
    </Flex>
  );
};

export default BeginSessionScreen;
