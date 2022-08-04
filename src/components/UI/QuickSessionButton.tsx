import { Button } from "native-base";

type Props = {
  title: string;
  onPress: () => void;
};

const QuickSessionButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <Button
      variant="ghost"
      fontFamily="Poppins_400Regular"
      onPress={onPress}
      colorScheme="teal"
      color="teal.500"
      size="lg"
    >
      {title}
    </Button>
  );
};

export default QuickSessionButton;
