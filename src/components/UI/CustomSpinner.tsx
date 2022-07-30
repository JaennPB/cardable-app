import { Spinner, HStack, Heading, Flex } from "native-base";

const CustomSpinner: React.FC = () => {
  return (
    <Flex flex={1} justify="center" align="center">
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading data..." color="black" />
        <Heading fontSize="md">Loading data</Heading>
      </HStack>
    </Flex>
  );
};

export default CustomSpinner;
