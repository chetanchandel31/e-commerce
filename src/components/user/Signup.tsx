import useEndpoint from "api/useEndpoint";
import Layout from "components/core/Layout";
import { Alert, Button, IconButton, Input, Text, useTheme } from "haki-ui";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import EyeIcon from "./helper/EyeIcon";
import { StyledAuthForm } from "./styles";
import { SignupReqBody, SignupResponse } from "./types";

const signupDataInitialState = {
  name: "",
  email: "",
  password: "",
  reEnterPassword: "",
  doShowPassword: false,
  doShowReEnterPassword: false,
};

const Signup = () => {
  const theme = useTheme();
  const iconColor = theme.colors.disabled.dark;

  const navigate = useNavigate();

  const signupEndpointState = useEndpoint<SignupReqBody, SignupResponse>({
    endpoint: "/signup",
    method: "POST",
  });
  const { error, isLoading, makeRequest, result } = signupEndpointState;

  const [signupData, setSignupData] = useState(signupDataInitialState);
  const {
    email,
    name,
    password,
    reEnterPassword,
    doShowPassword,
    doShowReEnterPassword,
  } = signupData;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSignupData((prev) => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    makeRequest({ email, name, password });
  };

  const doDisableSubmit =
    !name || !email || !password || reEnterPassword !== password;

  const toggleShowPassword = () =>
    setSignupData((prev) => ({
      ...prev,
      doShowPassword: !prev.doShowPassword,
    }));
  const toggleShowReEnterPassword = () =>
    setSignupData((prev) => ({
      ...prev,
      doShowReEnterPassword: !prev.doShowReEnterPassword,
    }));

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
              icon={<EyeIcon isVisible={doShowPassword} />}
              onClick={toggleShowPassword}
              size="sm"
              type="button"
              variant="ghost"
            />
          }
          type={doShowPassword ? "text" : "password"}
          value={password}
        />
        <Input
          error={password.length > 0 && password !== reEnterPassword}
          errorMessage="password doesn't match"
          fullWidth
          name="reEnterPassword"
          onChange={handleChange}
          placeholder="re-enter password"
          required
          rightAdornment={
            <IconButton
              circular
              icon={<EyeIcon isVisible={doShowReEnterPassword} />}
              onClick={toggleShowReEnterPassword}
              size="sm"
              type="button"
              variant="ghost"
            />
          }
          type={doShowReEnterPassword ? "text" : "password"}
          value={reEnterPassword}
        />

        {error && (
          <Text color="danger" variant="caption">
            {error}
          </Text>
        )}

        <Button disabled={doDisableSubmit} fullWidth isLoading={isLoading}>
          Sign up
        </Button>
      </StyledAuthForm>

      <Alert color="secondary" show={result !== null}>
        <Alert.Title>Signup successful</Alert.Title>
        <Alert.Body>
          new account created successfully:{" "}
          <Button
            color="secondary"
            onClick={() => navigate("/signin")}
            size="sm"
          >
            Login
          </Button>
        </Alert.Body>
      </Alert>
    </Layout>
  );
};

export default Signup;
