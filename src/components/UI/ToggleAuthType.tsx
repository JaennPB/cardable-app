import { Text, Divider, Flex, Button } from "native-base";

interface Props {
  dividerTitle: string;
  buttonTitle: string;
  onPress: () => void;
}

const ToggleAuthType: React.FC<Props> = ({
  dividerTitle,
  buttonTitle,
  onPress,
}) => {
  return (
    <>
      <Flex flexDir="row" alignItems="center" alignSelf="center" mt={10} mb={5}>
        <Divider w="30%" />
        <Text mx={2}>{dividerTitle}</Text>
        <Divider w="30%" />
      </Flex>
      <Button variant="outline" onPress={onPress}>
        {buttonTitle}
      </Button>
    </>
  );
};

export default ToggleAuthType;
