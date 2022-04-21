import { H2, H4 } from "haki-ui";
import { ReactNode } from "react";
import "../../styles.css";
import Header from "./Header";
import { StyledLayoutContainer } from "./styles";

type LayoutProps = {
  children: ReactNode;
  description?: string;
  maxWidth?: string;
  title?: string;
};

const Layout = ({ children, description, maxWidth, title }: LayoutProps) => (
  <>
    <Header />

    <StyledLayoutContainer maxWidth={maxWidth}>
      <H2>{title}</H2>
      <H4 color="disabled">{description}</H4>
      {children}
    </StyledLayoutContainer>

    <footer>footer</footer>
  </>
);

export default Layout;
