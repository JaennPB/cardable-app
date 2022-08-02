import { Box, Button, Divider, Flex, Heading } from "native-base";

import moment from "moment";

import CustomButton from "./CustomButton";

interface Props {
  onPressToday: () => void;
  onPressTomorrow: () => void;
}

const DateReview: React.FC<Props> = ({ onPressToday, onPressTomorrow }) => {
  return (
    <>
      <Heading size="md" fontFamily="Poppins_600SemiBold">
        {moment().format("MMMM Do YYYY")}
      </Heading>
      <Flex direction="row" justify="space-between">
        <Flex w="50%" pr={5}>
          <Heading mb={5} size="md" fontFamily="Poppins_600SemiBold">
            Today
          </Heading>
          <Button
            onPress={onPressToday}
            variant="outline"
            _text={{ fontFamily: "Poppins_400Regular" }}
            borderRadius={15}
            colorScheme="teal"
            borderColor="teal.400"
          >
            Box 1
          </Button>
        </Flex>
        <Divider orientation="vertical" />
        <Flex w="50%" pl={5}>
          <Heading mb={5} size="md" fontFamily="Poppins_600SemiBold">
            Tomorrow
          </Heading>
          <Button
            onPress={onPressTomorrow}
            variant="outline"
            _text={{ fontFamily: "Poppins_400Regular" }}
            borderRadius={15}
            colorScheme="teal"
            borderColor="teal.400"
          >
            Box 3
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default DateReview;
