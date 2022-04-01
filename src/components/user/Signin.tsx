import Layout from "components/core/Layout";
import { Button, IconButton, Input, useTheme } from "haki-ui";
import { AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { StyledAuthForm } from "./styles";

const Signin = () => {
  const theme = useTheme();

  const iconColor = theme.colors.disabled.dark;

  return (
    <Layout>
      <StyledAuthForm>
        <Input
          fullWidth
          leftAdornment={<AiOutlineMail style={{ color: iconColor }} />}
          onChange={() => {}}
          required
          placeholder="email"
        />
        <Input
          fullWidth
          onChange={() => {}}
          placeholder="password"
          required
          rightAdornment={
            <IconButton
              circular
              icon={
                <AiFillEyeInvisible
                  type="button"
                  style={{ color: iconColor }}
                />
              }
              onClick={() => {}}
              size="sm"
              type="button"
              variant="ghost"
            />
          }
          type="password"
        />

        <Button fullWidth>Sign in</Button>
      </StyledAuthForm>
    </Layout>
  );
};

export default Signin;
