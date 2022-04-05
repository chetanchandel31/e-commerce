import useEndpoint from "api/useEndpoint";
import Layout from "components/core/Layout";
import { Button, IconButton, Input, Text, useTheme } from "haki-ui";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { eyeIcon } from "./helper/eyeIcon";
import { StyledAuthForm } from "./styles";
import { SigninReqBody, SigninResponse } from "./types";

const signinDataInitialState = {
  email: "",
  password: "",
  doShowPassword: false,
};

const Signin = () => {
  const theme = useTheme();
  const iconColor = theme.colors.disabled.dark;

  const navigate = useNavigate();

  const signinEndpointState = useEndpoint<SigninReqBody, SigninResponse>({
    endpoint: "/signin",
    method: "POST",
  });
  const { error, isLoading, makeRequest, result } = signinEndpointState;

  const [signinData, setSigninData] = useState(signinDataInitialState);
  const { email, password, doShowPassword } = signinData;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSigninData((prev) => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    makeRequest({ email, password });
  };

  useEffect(() => {
    if (result !== null && !error) {
      localStorage.setItem("jwt", JSON.stringify(result));
      setSigninData(signinDataInitialState);
      // TODO: conditionally redirect based on role
      navigate("/");
    }
  }, [result, error]);

  const doDisableSignin = !email || !password;

  const toggleShowPassword = () =>
    setSigninData((prev) => ({
      ...prev,
      doShowPassword: !prev.doShowPassword,
    }));

  return (
    <Layout>
      <StyledAuthForm onSubmit={handleSubmit}>
        <Input
          fullWidth
          leftAdornment={<AiOutlineMail style={{ color: iconColor }} />}
          name="email"
          onChange={handleChange}
          required
          placeholder="email"
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
              icon={eyeIcon(doShowPassword)}
              onClick={toggleShowPassword}
              size="sm"
              type="button"
              variant="ghost"
            />
          }
          type={doShowPassword ? "text" : "password"}
          value={password}
        />

        {error && (
          <Text color="danger" variant="caption">
            {error}
          </Text>
        )}

        <Button disabled={doDisableSignin} fullWidth isLoading={isLoading}>
          Sign in
        </Button>
      </StyledAuthForm>
    </Layout>
  );
};

export default Signin;
