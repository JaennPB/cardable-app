import { Divider, Flex, Heading } from "native-base";

import moment from "moment";
import QuickSessionButton from "./QuickSessionButton";

interface Props {
  onPressToday: () => void;
  onPressTomorrow: () => void;
}

const DateReview: React.FC<Props> = ({ onPressToday, onPressTomorrow }) => {
  return (
    <>
      <Heading
        size="md"
        fontFamily="Poppins_600SemiBold"
        fontWeight="normal"
        mb={5}
      >
        {moment().format("MMMM Do YYYY")}
      </Heading>
      <Flex direction="row">
        <Flex flex={1}>
          <Heading fontWeight="normal" fontFamily="Poppins_600SemiBold" mb={5}>
            Today
          </Heading>
          <QuickSessionButton title="Box 1" onPress={() => {}} />
          <QuickSessionButton title="Box 2" onPress={() => {}} />
        </Flex>
        <Divider orientation="vertical" mx={5} />
        <Flex flex={1}>
          <Heading fontWeight="normal" fontFamily="Poppins_600SemiBold" mb={5}>
            Tomorrow
          </Heading>
          <QuickSessionButton title="Box 1" onPress={() => {}} />
          <QuickSessionButton title="Box 3" onPress={() => {}} />
        </Flex>
      </Flex>
    </>
  );
};

export default DateReview;
