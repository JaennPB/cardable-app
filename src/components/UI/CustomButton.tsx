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
      _text={{ fontSize: 18 }}
      isLoading={isLoading}
      isLoadingText={isLoadingText}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
