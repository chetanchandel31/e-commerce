import { useTheme } from "haki-ui";
import { NavLink } from "react-router-dom";
import { StyledHeaderContainer, StyledNavMenuContainer } from "./styles";

const Header = () => {
  const theme = useTheme();

  return (
    <>
      <StyledHeaderContainer color={theme.colors.primary.main}>
        {/* TODO: extract to `NavMenu` component later if needed */}
        <StyledNavMenuContainer>
          <li>
            <NavLink
              style={({ isActive }) => ({
                ...(isActive ? { fontWeight: 600 } : {}),
              })}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/aa">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/aa">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/aa">A.Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/aa">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/aa">Sign in</NavLink>
          </li>
          <li>
            <NavLink to="/aa">Signout</NavLink>
          </li>
        </StyledNavMenuContainer>
      </StyledHeaderContainer>
    </>
  );
};

export default Header;
