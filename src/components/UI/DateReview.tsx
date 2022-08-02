import { Button, Divider, Flex, Heading } from "native-base";

import moment from "moment";

interface Props {
  onPressToday: () => void;
  onPressTomorrow: () => void;
}

interface PropsComp {
  onPress: () => void;
  when: string;
  boxLink: string;
}

const ShortcutToBoxComp: React.FC<PropsComp> = ({ onPress, when, boxLink }) => {
  return (
    <Flex w="50%" pr={5}>
      <Heading
        mb={5}
        size="md"
        fontFamily="Poppins_600SemiBold"
        fontWeight="normal"
      >
        {when}
      </Heading>
      <Button
        onPress={onPress}
        variant="outline"
        _text={{ fontFamily: "Poppins_400Regular" }}
        borderRadius={15}
        colorScheme="teal"
        borderColor="teal.400"
      >
        {boxLink}
      </Button>
    </Flex>
  );
};

const DateReview: React.FC<Props> = ({ onPressToday, onPressTomorrow }) => {
  return (
    <>
      <Heading size="md" fontFamily="Poppins_600SemiBold" fontWeight="normal">
        {moment().format("MMMM Do YYYY")}
      </Heading>
      <Flex direction="row" justify="space-between">
        <ShortcutToBoxComp
          onPress={onPressToday}
          when="Today"
          boxLink="Box 1"
        />
        <Divider orientation="vertical" mr={5} />
        <ShortcutToBoxComp
          onPress={onPressTomorrow}
          when="Tomorrow"
          boxLink="Box 3"
        />
      </Flex>
    </>
  );
};

export default DateReview;
