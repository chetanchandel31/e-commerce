import { AuthProvider } from "contexts/auth-context";
import { CartProvider } from "contexts/cart-context";
import { HakiProvider } from "haki-ui";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

// <MemoryRouter /> keeps the history of your “URL” in memory (does not read or write to the address bar).
// Useful in tests and non-browser environments like React Native.

const Wrapper = ({ children }: { children: ReactNode }) => (
  <HakiProvider>
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </MemoryRouter>
  </HakiProvider>
);

export default Wrapper;
