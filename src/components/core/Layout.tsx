import { H2, H4 } from "haki-ui";
import { ReactNode } from "react";
import "../../styles.css";
import Header from "./Header";
import { Container } from "./styles";

type LayoutProps = {
  children: ReactNode;
  description?: string;
  title?: string;
};

const Layout = ({ children, description, title }: LayoutProps) => (
  <>
    <Header />

    <Container>
      <H2>{title}</H2>
      <H4 color="disabled">{description}</H4>
      {children}
    </Container>

    <footer>footer</footer>
  </>
);

export default Layout;
