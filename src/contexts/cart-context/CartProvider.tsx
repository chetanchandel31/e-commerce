import { ReactNode, useEffect, useState } from "react";
import { CART } from "shared-constants";
import { Product } from "shared-types";
import { CartContext } from "./cart-context";

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const cartItemsFromLocalStorage = localStorage.getItem(CART);

    if (cartItemsFromLocalStorage) {
      setCartItems(
        JSON.parse(cartItemsFromLocalStorage as string) as Product[]
      );
    }
  }, []);

  const addToCart = (product: Product) => {
    const cartItems: Product[] =
      JSON.parse(localStorage.getItem(CART) as string) || [];

    localStorage.setItem(CART, JSON.stringify([...cartItems, product]));

    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId: string) => {
    const cartFromLocalStorage = localStorage.getItem(CART);

    if (cartFromLocalStorage) {
      const cartItems: Product[] = JSON.parse(cartFromLocalStorage) || [];

      const filteredCartItems = cartItems.filter(
        (product) => product._id !== productId
      );

      localStorage.setItem(CART, JSON.stringify(filteredCartItems));

      setCartItems(filteredCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem(CART, JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      // problem: whenever component renders, value object will change and context will run unnecessarily
      // justification: this component can only re-render when `userInfo` changes and we *want* context to re-render in such case
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ addToCart, cartItems, clearCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
