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
      p={5}
      bg="teal.400"
      colorScheme="teal"
    >
      {title}
    </Button>
  );
};

export default CustomButton;
