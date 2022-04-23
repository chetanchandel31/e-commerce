import ProductCard from "components/core/helper/ProductCard";
import Layout from "components/core/Layout";
import { useCart } from "contexts/cart-context";
import { Button, H5 } from "haki-ui";
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "./StripeCheckout";
import { StyledCartContainer } from "./styles";

const Cart = () => {
  const { cartItems } = useCart();

  const navigate = useNavigate();

  return (
    <Layout>
      <StyledCartContainer>
        <div className="cart-items">
          {cartItems.length === 0 && (
            <div className="cart-empty-state">
              <H5>Your cart is empty</H5>
              <Button
                onClick={() => navigate("/")}
                startIcon={<BiShoppingBag />}
              >
                Buy something
              </Button>
            </div>
          )}

          {cartItems.map((product) => (
            <ProductCard
              product={product}
              enableAddToCart={false}
              key={product._id}
            />
          ))}
        </div>

        <div className="order-panel" style={{ border: "solid 2px black" }}>
          <StripeCheckout />
        </div>
      </StyledCartContainer>
    </Layout>
  );
};

export default Cart;
