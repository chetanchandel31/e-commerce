import useEndpoint from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import { CircularProgress, useTheme } from "haki-ui";

const SignoutNavItem = () => {
  const theme = useTheme();
  const { signOut } = useAuth();

  const { isLoading, makeRequest } = useEndpoint<
    undefined,
    { message: string }
  >({
    endpoint: "/signout",
  });

  const handleSignout = async () => {
    const signOutResult = await makeRequest(undefined);

    if (signOutResult.type === "success") signOut();
    else alert("signout failed");
  };

  return (
    <li className="signout-nav-item">
      {isLoading && (
        <CircularProgress
          size={12}
          style={{
            borderColor: "#b7b7b7",
            borderTopColor: theme.colors.primary.main,
          }}
          thickness={2}
        />
      )}
      <span
        className="nav-link"
        onClick={handleSignout}
        style={isLoading ? { color: "#b7b7b7" } : {}}
      >
        Signout
      </span>
    </li>
  );
};

export default SignoutNavItem;
