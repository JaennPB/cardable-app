import { Button } from "native-base";

interface Props {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  isLoadingText?: string;
}

const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  isLoading,
  isLoadingText,
}) => {
  return (
    <Button
      onPress={onPress}
      _text={{ fontSize: 20, fontFamily: "Poppins_400Regular" }}
      isLoading={isLoading}
      isLoadingText={isLoadingText}
      borderRadius={20}
      px={5}
      py={3}
      bg="teal.500"
      colorScheme="teal"
    >
      {title}
    </Button>
  );
};

export default CustomButton;
