import { ReactNode, useEffect, useState } from "react";
import { CART } from "shared-constants";
import { ProductInCart } from "shared-types";
import { CartContext } from "./cart-context";

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductInCart[]>([]);

  const cartItemsTotalPrice = cartItems.reduce(
    (prevVal, { count, price }) => prevVal + price * count,
    0
  );

  useEffect(() => {
    const cartItemsFromLocalStorage = localStorage.getItem(CART);

    if (cartItemsFromLocalStorage) {
      setCartItems(
        JSON.parse(cartItemsFromLocalStorage as string) as ProductInCart[]
      );
    }
  }, []);

  const addToCart = (product: ProductInCart) => {
    const cartItems: ProductInCart[] =
      JSON.parse(localStorage.getItem(CART) as string) || [];

    localStorage.setItem(CART, JSON.stringify([...cartItems, product]));

    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId: string) => {
    const cartFromLocalStorage = localStorage.getItem(CART);

    if (cartFromLocalStorage) {
      const cartItems: ProductInCart[] = JSON.parse(cartFromLocalStorage) || [];

      const filteredCartItems = cartItems.filter(
        (cartProduct) => cartProduct.product !== productId
      );

      localStorage.setItem(CART, JSON.stringify(filteredCartItems));

      setCartItems(filteredCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem(CART, JSON.stringify([]));
  };

  const increaseCartProductQuantity = (productId: string) => {
    const incrementProductCount = (cartItem: ProductInCart) => {
      if (cartItem.product === productId) {
        return { ...cartItem, count: cartItem.count + 1 };
      }

      return cartItem;
    };

    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map(incrementProductCount);
      localStorage.setItem(CART, JSON.stringify(updatedCartItems));

      return prevCartItems.map(incrementProductCount);
    });
  };

  const decreaseCartProductQuantity = (productId: string) => {
    const decrementProductCount = (cartItem: ProductInCart) => {
      if (cartItem.product === productId) {
        return { ...cartItem, count: cartItem.count - 1 };
      }

      return cartItem;
    };

    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map(decrementProductCount);
      localStorage.setItem(CART, JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  return (
    <CartContext.Provider
      // problem: whenever component renders, value object will change and context will run unnecessarily
      // justification: this component can only re-render when `userInfo` changes and we *want* context to re-render in such case
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        addToCart,
        cartItems,
        cartItemsTotalPrice,
        clearCart,
        decreaseCartProductQuantity,
        increaseCartProductQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
