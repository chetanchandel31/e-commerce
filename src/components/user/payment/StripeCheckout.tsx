import useEndpoint from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import { useCart } from "contexts/cart-context";
import { Button } from "haki-ui";
import { useNavigate } from "react-router-dom";
import StripeCheckoutButton, { Token } from "react-stripe-checkout";
import { ProductInCart } from "shared-types";
import { CreateOrderRequest, CreateOrderResponse } from "../types";

type StripePaymentRequestType = {
  token: Token;
  products: ProductInCart[];
};

const StripeCheckout = () => {
  const navigate = useNavigate();

  const { userInfo } = useAuth();

  const { cartItems, cartItemsTotalPrice, clearCart } = useCart();

  const { makeRequest: makeStripePaymentRequest } = useEndpoint<
    StripePaymentRequestType,
    any
  >({
    endpoint: "/stripe-payment",
    method: "POST",
  });

  const { makeRequest: makeCreateOrderRequest } = useEndpoint<
    CreateOrderRequest,
    CreateOrderResponse
  >({
    endpoint: `/order/create/${userInfo?.user._id}`,
    method: "POST",
  });

  // eslint-disable-next-line consistent-return
  const makePayment = async (token: Token) => {
    if (!userInfo) return navigate("/signin");

    const res = await makeStripePaymentRequest({ token, products: cartItems });

    if (res.type === "success") {
      makeCreateOrderRequest({
        order: {
          amount: cartItemsTotalPrice,
          products: cartItems,
          transaction_id: res.data.id,
        },
      });
      clearCart();
    } else console.log(res);
  };

  return userInfo ? (
    <StripeCheckoutButton
      // `publishable key` from stripe dashboard
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string}
      token={makePayment}
      amount={cartItemsTotalPrice * 100} // * 100 because by default things will be in cents
      name="Buy Tshirts"
      shippingAddress
      billingAddress
    >
      <Button fullWidth>Pay with stripe</Button>
    </StripeCheckoutButton>
  ) : (
    <div>
      <Button fullWidth onClick={() => navigate("/signin")}>
        Pay with stripe
      </Button>
    </div>
  );
};

export default StripeCheckout;
