import useEndpoint from "api/useEndpoint";
import { getJwtfromLocalstorage } from "auth/helper";
import { CircularProgress, useTheme } from "haki-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignoutNavItem = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { error, isLoading, makeRequest, result } = useEndpoint({
    endpoint: "/signout",
  });

  useEffect(() => {
    if (result !== null && !error) {
      localStorage.removeItem("jwt");
      navigate("/");
    }
    if (error) {
      alert("signout failed :(");
    }
  }, [result, error]);

  return (
    <>
      {getJwtfromLocalstorage() !== null && (
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
            onClick={() => makeRequest(undefined)}
            style={isLoading ? { color: "#b7b7b7" } : {}}
          >
            Signout
          </span>
        </li>
      )}
    </>
  );
};

export default SignoutNavItem;
