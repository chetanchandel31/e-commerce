import { ReactNode } from "react";
import Header from "./Header";
import { Container } from "./styles";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <footer>footer</footer>
    </>
  );
};

export default Layout;
