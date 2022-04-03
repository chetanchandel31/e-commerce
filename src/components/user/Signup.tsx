import { signup } from "auth/helper";
import Layout from "components/core/Layout";
import { Alert, Button, IconButton, Input, useTheme } from "haki-ui";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  AiFillEyeInvisible,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { StyledAuthForm } from "./styles";

const signupInitialState = {
  name: "",
  email: "",
  password: "",
  error: "",
  success: false,
};

const Signup = () => {
  const theme = useTheme();
  const iconColor = theme.colors.disabled.dark;

  const navigate = useNavigate();

  const [signupData, setSignupData] = useState(signupInitialState);
  const { email, name, password, success, error } = signupData;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSignupData((prev) => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await signup({ email, name, password });
      console.log(result, "result");

      if (!result || typeof result?.error == "string") {
        setSignupData((prev) => ({
          ...prev,
          error: result?.error || "request failed",
          success: false,
        }));
      } else {
        setSignupData({ ...signupInitialState, success: true });
      }
    } catch (error) {
      console.log("signup failed", error);
    }
  };

  const doDisableSubmit = !name || !email || !password;

  // TODO: re-enter password
  // TODO: errors for password don't match etc.
  // TODO: loading state
  // TODO: show password
  return (
    <Layout>
      <StyledAuthForm onSubmit={handleSubmit}>
        <Input
          fullWidth
          leftAdornment={<AiOutlineUser style={{ color: iconColor }} />}
          name="name"
          onChange={handleChange}
          required
          placeholder="username"
          value={name}
        />
        <Input
          fullWidth
          leftAdornment={<AiOutlineMail style={{ color: iconColor }} />}
          name="email"
          onChange={handleChange}
          placeholder="email"
          required
          type="email"
          value={email}
        />
        <Input
          fullWidth
          name="password"
          onChange={handleChange}
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
          value={password}
        />

        <Button disabled={doDisableSubmit} fullWidth>
          Sign up
        </Button>
      </StyledAuthForm>

      <Alert show={success}>
        <Alert.Title>Signup successful</Alert.Title>
        <Alert.Body>
          new account created successfully:{" "}
          <Button onClick={() => navigate("/signin")}>Login</Button>
        </Alert.Body>
      </Alert>

      <Alert
        color={"danger"}
        onClose={() => setSignupData((prev) => ({ ...prev, error: "" }))}
        show={Boolean(error)}
      >
        <Alert.Title>Signup failed</Alert.Title>
        <Alert.Body>{error}</Alert.Body>
      </Alert>
    </Layout>
  );
};

export default Signup;
