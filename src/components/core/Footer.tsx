import { Button, Text } from "haki-ui";
import { StyledFooter } from "./styles";

const Footer = () => (
  <StyledFooter>
    <Text color="disabled" variant="body2">
      If you have any questions, feel free to reach out.
    </Text>

    <Button
      onClick={() => {
        window
          ?.open("https://www.youtube.com/watch?v=iik25wqIuFo", "_blank")
          ?.focus();
      }}
      size="sm"
      variant="ghost"
    >
      Contact us
    </Button>
  </StyledFooter>
);

export default Footer;
