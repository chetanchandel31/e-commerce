import useEndpoint from "api/useEndpoint";
import { authenticate, getJwtfromLocalstorage } from "auth/helper";
import Layout from "components/core/Layout";
import { Button, IconButton, Input, Text, useTheme } from "haki-ui";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { StyledAuthForm } from "./styles";

const signinInitialState = {
  email: "",
  password: "",
};

type SigninReqBody = { email: string; password: string };
type SigninResponse = {
  token: string;
  user: {
    email: string;
    name: string;
    role: number;
    _id: string;
  };
};

const Signin = () => {
  const signinEndpointState = useEndpoint<SigninReqBody, SigninResponse>({
    endpoint: "/signin",
    method: "POST",
  });
  const { error, isLoading, makeRequest, result } = signinEndpointState;

  const [signinData, setSigninData] = useState(signinInitialState);
  const { email, password } = signinData;
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSigninData((prev) => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await makeRequest({ email, password });
    authenticate(data, () => setSigninData(signinInitialState)); // TODO: remove next()
  };

  const performRedirect = (didRedirect: boolean) => {
    if (didRedirect) {
      // if user.role === 1 // redirect to admin dashboard
      // else // redirect to user dashboard
    }
  };

  const jwtFromLocalstorage = getJwtfromLocalstorage();

  useEffect(() => {
    if (result !== null && !error) {
      // performRedirect()
    }
  }, [result]);

  const theme = useTheme();

  const iconColor = theme.colors.disabled.dark;

  const doDisableSignin = !email || !password;

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
