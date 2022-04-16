import { useAuth } from "contexts/auth-context";
import { useTheme } from "haki-ui";
import { NavLink } from "react-router-dom";
import SignoutNavItem from "./SignoutNavItem";
import { StyledHeaderContainer, StyledNavMenuContainer } from "./styles";

const getActiveLinkStyles = ({ isActive }: { isActive: boolean }) => ({
  ...(isActive ? { fontWeight: 600 } : {}),
});

const Header = () => {
  const theme = useTheme();
  const { userInfo } = useAuth();

  return (
    <StyledHeaderContainer color={theme.colors.primary.main}>
      {/* TODO: extract to `NavMenu` component later if needed */}
      <StyledNavMenuContainer>
        <li>
          <NavLink style={getActiveLinkStyles} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink style={getActiveLinkStyles} to="/aa">
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink style={getActiveLinkStyles} to="/user-dashboard">
            Dashboard
          </NavLink>
        </li>
        {userInfo?.user.role === 1 && (
          <li>
            <NavLink style={getActiveLinkStyles} to="/admin-dashboard">
              A.Dashboard
            </NavLink>
          </li>
        )}
        {userInfo === null ? (
          <>
            <li>
              <NavLink style={getActiveLinkStyles} to="/signup">
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink style={getActiveLinkStyles} to="/signin">
                Sign in
              </NavLink>
            </li>
          </>
        ) : (
          <SignoutNavItem />
        )}
      </StyledNavMenuContainer>
    </StyledHeaderContainer>
  );
};

export default Header;
