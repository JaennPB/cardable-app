import { Divider, Flex, Heading } from "native-base";

import moment from "moment";
import QuickSessionButton from "./QuickSessionButton";

interface Props {}

const DateReview: React.FC<Props> = () => {
  return (
    <>
      <Heading
        size="md"
        fontFamily="Poppins_600SemiBold"
        fontWeight="normal"
        mb={5}
      >
        {moment().format("MMMM Do YYYY")}{" "}
        <Heading color="teal.500" fontSize={16}>
          Day 12
        </Heading>
      </Heading>
      <Flex direction="row">
        <Flex flex={1}>
          <Heading
            fontWeight="normal"
            fontFamily="Poppins_600SemiBold"
            mb={5}
            size="md"
          >
            Today
          </Heading>
          <QuickSessionButton title="Box 5" onPress={() => {}} />
          <QuickSessionButton title="Box 1" onPress={() => {}} />
        </Flex>
        <Divider orientation="vertical" mx={5} />
        <Flex flex={1}>
          <Heading
            fontWeight="normal"
            fontFamily="Poppins_600SemiBold"
            mb={5}
            size="md"
          >
            Tomorrow
          </Heading>
          <QuickSessionButton title="Box 4" onPress={() => {}} />
          <QuickSessionButton title="Box 2" onPress={() => {}} />
          <QuickSessionButton title="Box 1" onPress={() => {}} />
        </Flex>
      </Flex>
    </>
  );
};

export default DateReview;
