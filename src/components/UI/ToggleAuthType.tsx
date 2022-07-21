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
        <Divider w="20%" />
        <Text mx={2}>{dividerTitle}</Text>
        <Divider w="20%" />
      </Flex>
      <Button variant="ghost" onPress={onPress} _text={{ fontSize: 18 }}>
        {buttonTitle}
      </Button>
    </>
  );
};

export default ToggleAuthType;
