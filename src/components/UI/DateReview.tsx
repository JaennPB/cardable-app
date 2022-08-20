import { Divider, Flex, Heading, Pressable, Text } from "native-base";

import { LEITNER_SCHEDULE } from "../../hooks/utils";
import QuickSessionButton from "./QuickSessionButton";

interface Props {
  onPress: () => void;
}

const DAY = "1";
const TOMORROW = "2";

const DateReview: React.FC<Props> = ({ onPress }) => {
  return (
    <Flex flex={2} bg="white" p={5} borderTopRadius={20}>
      <Flex flexDir="row" justify="space-between" align="center" mb={5}>
        <Pressable onPress={onPress} _pressed={{ opacity: 0.3 }}>
          <Heading>Capital cities</Heading>
        </Pressable>
        <Text fontFamily="Poppins_600SemiBold" fontSize={16} color="teal.500">
          {`Day ${DAY}`}
        </Text>
      </Flex>
      <Flex direction="row">
        <Flex flex={1}>
          <Heading
            fontWeight="normal"
            fontFamily="Poppins_600SemiBold"
            size="md"
          >
            Today
          </Heading>
          {LEITNER_SCHEDULE[DAY].map((box, index) => (
            <QuickSessionButton
              key={index}
              title={`Box ${box.toString()}`}
              onPress={() => {}}
            />
          ))}
          {LEITNER_SCHEDULE[DAY].length < 3 && (
            <QuickSessionButton title="N/A" onPress={() => {}} />
          )}
        </Flex>
        <Divider orientation="vertical" mx={5} />
        <Flex flex={1}>
          <Heading
            fontWeight="normal"
            fontFamily="Poppins_600SemiBold"
            size="md"
          >
            Tomorrow
          </Heading>
          {LEITNER_SCHEDULE[TOMORROW].map((box, index) => (
            <QuickSessionButton
              key={index}
              title={`Box ${box.toString()}`}
              onPress={() => {}}
            />
          ))}
          {LEITNER_SCHEDULE[TOMORROW].length < 3 && (
            <QuickSessionButton title="N/A" onPress={() => {}} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DateReview;
