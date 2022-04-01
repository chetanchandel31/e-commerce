import { useTheme } from "haki-ui";
import { NavLink } from "react-router-dom";
import { StyledHeaderContainer, StyledNavMenuContainer } from "./styles";

const getActiveLinkStyles = ({ isActive }: { isActive: boolean }) => ({
  ...(isActive ? { fontWeight: 600 } : {}),
});

const Header = () => {
  const theme = useTheme();

  return (
    <>
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
            <NavLink style={getActiveLinkStyles} to="/aa">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink style={getActiveLinkStyles} to="/aa">
              A.Dashboard
            </NavLink>
          </li>
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
          <li>
            <NavLink style={getActiveLinkStyles} to="/aa">
              Signout
            </NavLink>
          </li>
        </StyledNavMenuContainer>
      </StyledHeaderContainer>
    </>
  );
};

export default Header;
