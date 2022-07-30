import { Box, Button, Divider, Flex, Heading } from "native-base";

import moment from "moment";

import CustomButton from "./CustomButton";

interface Props {
  onPress: () => void;
}

const DateReview: React.FC<Props> = ({ onPress }) => {
  return (
    <>
      <Heading size="md">{moment().format("MMMM Do YYYY")}</Heading>
      <Flex direction="row" justify="space-between">
        <Flex w="50%" pr={5}>
          <Heading mb={5} size="md">
            Today
          </Heading>
          <Button onPress={onPress} variant="outline">
            Box 1
          </Button>
        </Flex>
        <Divider orientation="vertical" />
        <Flex w="50%" pl={5}>
          <Heading mb={5} size="md">
            Tomorrow
          </Heading>
          <Button onPress={onPress} variant="outline">
            Box 3
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default DateReview;
