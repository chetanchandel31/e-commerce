import useEndpoint from "api/useEndpoint";
import { Dropin } from "braintree-web-drop-in";
import DropIn from "braintree-web-drop-in-react";
import { useAuth } from "contexts/auth-context";
import { useCart } from "contexts/cart-context";
import { Button, CircularProgress } from "haki-ui";
import { useState } from "react";
import { BrainTreeLoaderContainer } from "./styles";

type GetBrainTreeTokenResponse = {
  clientToken: string;
  success: string;
};

type ProcessPaymentRequest = {
  amount: number;
  nonceFromTheClient: string;
};

const BraintreeCheckout = () => {
  const { userInfo } = useAuth();
  const { cartItems, clearCart } = useCart();

  const [instance, setInstance] = useState<Dropin | null>(null);

  const { isLoading, result } = useEndpoint<
    undefined,
    GetBrainTreeTokenResponse
  >({
    endpoint: `/payment/braintree/${userInfo?.user._id}`,
    preLoadResult: Boolean(userInfo?.user._id),
  });

  const { makeRequest: makeProcessPaymentReq } = useEndpoint<
    ProcessPaymentRequest,
    any
  >({
    endpoint: `/payment/braintree/${userInfo?.user._id}`,
    method: "POST",
  });

  const buy = async () => {
    // Send the nonce to your server
    const dropInResponse = await instance?.requestPaymentMethod();

    const res = await makeProcessPaymentReq({
      amount: cartItems.reduce(
        (prevVal, currentVal) => prevVal + currentVal.price,
        0
      ),
      nonceFromTheClient: dropInResponse?.nonce as string,
    });

    if (res.type === "success") clearCart();
  };

  return (
    <>
      {isLoading && (
        <BrainTreeLoaderContainer className="braintree-loader">
          <CircularProgress size={60} />
        </BrainTreeLoaderContainer>
      )}

      {result !== null && (
        <>
          <DropIn
            onInstance={(instance) => {
              // this callback runs on mount
              setInstance(instance);
            }}
            options={{ authorization: result?.clientToken }}
          />
          <Button
            fullWidth
            isLoading={isLoading || instance === null}
            onClick={buy}
          >
            Pay
          </Button>
        </>
      )}
    </>
  );
};

export default BraintreeCheckout;
