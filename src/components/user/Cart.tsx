import useEndpoint from "api/useEndpoint";
import EmptyCart from "assets/empty-cart.svg";
import ProductCard from "components/core/helper/ProductCard";
import Layout from "components/core/Layout";
import { useCart } from "contexts/cart-context";
import { Button, CircularProgress, H5, Text } from "haki-ui";
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Product } from "shared-types";
import BraintreeCheckout from "./payment/BraintreeCheckout";
import StripeCheckout from "./payment/StripeCheckout";
import PricingDetails from "./PricingDetails";
import { StyledCartContainer } from "./styles";

const Cart = () => {
  const { cartItems } = useCart();

  const { error, isLoading, result } = useEndpoint<undefined, Product[]>({
    endpoint: "/products",
    preLoadResult: true,
  });

  const cartProducts = result?.filter((product) =>
    cartItems.find((cartProduct) => cartProduct.product === product._id)
  );

  const navigate = useNavigate();

  if (isLoading || error) {
    return (
      <Layout>
        {isLoading && (
          <CircularProgress size={90} style={{ margin: "8rem auto" }} />
        )}

        {error && (
          <Text color="danger" style={{ margin: "8rem", textAlign: "center" }}>
            {error}
          </Text>
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <StyledCartContainer>
        <div className="cart-items">
          {cartProducts?.length === 0 && (
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

          {cartProducts?.map((product) => (
            <ProductCard
              product={product}
              enableAddToCart={false}
              key={product._id}
            />
          ))}
        </div>

        <div className="order-panel">
          {cartProducts && cartProducts.length > 0 ? (
            <>
              <PricingDetails />

              <BraintreeCheckout />

              <h3 className="or">OR</h3>

              <StripeCheckout />
            </>
          ) : (
            <div className="empty-cart-img-container">
              <img alt="empty-cart" src={EmptyCart} />
            </div>
          )}
        </div>
      </StyledCartContainer>
    </Layout>
  );
};

export default Cart;
