import useEndpoint from "api/useEndpoint";
import Layout from "components/core/Layout";
import { useAuth } from "contexts/auth-context";
import { Button, IconButton, Input, Text, useTheme } from "haki-ui";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineMail, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import EyeIcon from "./helper/EyeIcon";
import { StyledAuthForm } from "./styles";
import { SigninReqBody, SigninResponse } from "./types";

const signinDataInitialState = {
  email: "",
  password: "",
  doShowPassword: false,
};

const Signin = () => {
  const { colors } = useTheme();
  const iconColor = colors.disabled.dark;

  const navigate = useNavigate();
  const { signIn } = useAuth();

  const { error, isLoading, makeRequest } = useEndpoint<
    SigninReqBody,
    SigninResponse
  >({
    endpoint: "/signin",
    method: "POST",
  });

  const [{ email, password, doShowPassword }, setSigninData] = useState(
    signinDataInitialState
  );

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSigninData((prev) => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signinResult = await makeRequest({ email, password });

    if (signinResult.type === "success") signIn(signinResult.data);
  };

  const toggleShowPassword = () =>
    setSigninData((prev) => ({
      ...prev,
      doShowPassword: !prev.doShowPassword,
    }));

  const handleDummySignIn = (isDummySignInAsAdmin?: boolean) =>
    setSigninData((prev) => ({
      ...prev,
      email: isDummySignInAsAdmin ? "admin@admin.com" : "regular_user@user.com",
      password: "123456",
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

        {error && (
          <Text color="danger" variant="caption">
            {error}
          </Text>
        )}

        <div className="primary-btn-container">
          <Button
            disabled={!email || !password}
            fullWidth
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </div>

        <div className="test-credential-btns">
          <Button
            onClick={() => handleDummySignIn(true)}
            size="sm"
            type="button"
            variant="ghost"
          >
            Use test credentials (admin)
          </Button>
          <Button
            onClick={() => handleDummySignIn()}
            size="sm"
            type="button"
            variant="ghost"
          >
            Use test credentials
          </Button>
        </div>

        <Button
          fullWidth
          endIcon={<AiOutlineRight />}
          onClick={() => navigate("/signup")}
          style={{ color: "rgba(0, 0,0,0.6)" }}
          type="button"
          variant="ghost"
        >
          Create new account
        </Button>
      </StyledAuthForm>
    </Layout>
  );
};

export default Signin;
