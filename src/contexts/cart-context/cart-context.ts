import { createContext } from "react";
import { Product } from "shared-types";

type CartContextInterface = {
  cartItems: Product[];
  // eslint-disable-next-line no-unused-vars
  addToCart: (product: Product) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (productId: string) => void;
};

const logWarning = () =>
  console.warn("component probably isn't wrapped within CartContext");

export const CartContext = createContext<CartContextInterface>({
  addToCart: logWarning,
  cartItems: [],
  removeFromCart: logWarning,
});
