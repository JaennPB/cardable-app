import { Button } from "native-base";

interface Props {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <Button onPress={onPress} _text={{ fontSize: 18 }}>
      {title}
    </Button>
  );
};

export default CustomButton;
