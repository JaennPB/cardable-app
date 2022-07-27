import { Box, Heading } from "native-base";

interface Props {
  text: string;
}

const Flashcard: React.FC<Props> = ({ text }) => {
  // animated flashcard with question on front and answer on the back
  // flip when touched
  // border red when failed and animate to the left
  // border green when succeded and animate to the right

  return (
    <Box
      borderWidth={1}
      borderColor="#ccc"
      bg="white"
      shadow="1"
      h={500}
      w={330}
      borderRadius={25}
      justifyContent="center"
      alignItems="center"
    >
      <Heading>{text}</Heading>
    </Box>
  );
};

export default Flashcard;
