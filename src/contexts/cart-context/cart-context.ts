import { createContext } from "react";
import { ProductInCart } from "shared-types";

type CartContextInterface = {
  cartItems: ProductInCart[];
  // eslint-disable-next-line no-unused-vars
  addToCart: (product: ProductInCart) => void;
  clearCart: () => void;
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (productId: string) => void;
};

const logWarning = () =>
  console.warn("component probably isn't wrapped within CartContext");

export const CartContext = createContext<CartContextInterface>({
  addToCart: logWarning,
  cartItems: [],
  clearCart: logWarning,
  removeFromCart: logWarning,
});
