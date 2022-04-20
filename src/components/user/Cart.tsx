import ProductCard from "components/core/helper/ProductCard";
import Layout from "components/core/Layout";
import { useCart } from "contexts/cart-context";

const Cart = () => {
  // cards with remove from cart working local storage and state
  // layout stuffs
  const { cartItems } = useCart();

  console.log(cartItems, "cart itemmmm");

  return (
    <Layout>
      {cartItems.map((product) => (
        <ProductCard
          product={product}
          enableAddToCart={false}
          key={product._id}
        />
      ))}
    </Layout>
  );
};

export default Cart;
