import useEndpoint from "api/useEndpoint";
import { useAuth } from "contexts/auth-context";
import { useCart } from "contexts/cart-context";
import { Button } from "haki-ui";
import { useNavigate } from "react-router-dom";
import StripeCheckoutButton, { Token } from "react-stripe-checkout";
import { Product } from "shared-types";

type StripePaymentRequestType = {
  token: Token;
  products: Product[];
};

const StripeCheckout = () => {
  const navigate = useNavigate();

  const { userInfo } = useAuth();

  const { cartItems, clearCart } = useCart();

  const getFinalAmount = () =>
    cartItems.reduce((prevVal, currentVal) => prevVal + currentVal.price, 0);

  // TODO: fix any
  const { makeRequest } = useEndpoint<StripePaymentRequestType, any>({
    endpoint: "/stripe-payment",
    method: "POST",
  });

  // eslint-disable-next-line consistent-return
  const makePayment = async (token: Token) => {
    if (!userInfo) return navigate("/signin");

    const res = await makeRequest({ token, products: cartItems });

    if (res.type === "success") {
      // TODO: if sucess, 1. post request to 2. "/order/create/${userId}" 3. {order: orderData} in req.body
      clearCart();
    } else console.log(res);
  };

  return (
    <div style={{ border: "solid 1px blue" }}>
      StripeCheckout {getFinalAmount()}
      <StripeCheckoutButton
        // `publishable key` from stripe dashboard
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string}
        token={makePayment}
        amount={getFinalAmount() * 100} // * 100 because by default things will be in cents
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <Button>Pay with stripe</Button>
      </StripeCheckoutButton>
    </div>
  );
};

export default StripeCheckout;
