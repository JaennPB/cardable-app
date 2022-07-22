import { Spinner, HStack, Heading } from "native-base";

const CustomSpinner: React.FC = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading data..." color="black" />
      <Heading fontSize="md">Loading data</Heading>
    </HStack>
  );
};

export default CustomSpinner;
