import useEndpoint from "api/useEndpoint";
import { Dropin } from "braintree-web-drop-in";
import DropIn from "braintree-web-drop-in-react";
import { useAuth } from "contexts/auth-context";
import { useCart } from "contexts/cart-context";
import { Button, CircularProgress } from "haki-ui";
import { useState } from "react";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetBrainTreeTokenResponse,
  ProcessPaymentRequest,
} from "../types";
import { BrainTreeLoaderContainer } from "./styles";

const BraintreeCheckout = () => {
  const { userInfo } = useAuth();
  const { cartItems, clearCart } = useCart();

  const cartItemsTotalPrice = cartItems.reduce(
    (prevVal, currentVal) => prevVal + currentVal.price,
    0
  );

  const [instance, setInstance] = useState<Dropin | null>(null);

  const {
    isLoading: isGetBrainTreeTokenLoading,
    result: getBrainTreeTokenResult,
  } = useEndpoint<undefined, GetBrainTreeTokenResponse>({
    endpoint: `/payment/braintree/${userInfo?.user._id}`,
    preLoadResult: Boolean(userInfo?.user._id),
  });

  const {
    isLoading: isProcessPaymentLoading,
    makeRequest: makeProcessPaymentReq,
  } = useEndpoint<ProcessPaymentRequest, any>({
    endpoint: `/payment/braintree/${userInfo?.user._id}`,
    method: "POST",
  });

  const {
    isLoading: isCreateOrderLoading,
    makeRequest: makeCreateOrderRequest,
  } = useEndpoint<CreateOrderRequest, CreateOrderResponse>({
    endpoint: `/order/create/${userInfo?.user._id}`,
    method: "POST",
  });

  const buy = async () => {
    // Send the nonce to your server
    const dropInResponse = await instance?.requestPaymentMethod();

    const res = await makeProcessPaymentReq({
      amount: cartItemsTotalPrice,
      nonceFromTheClient: dropInResponse?.nonce as string,
    });

    if (res.type === "success") {
      makeCreateOrderRequest({
        order: {
          amount: cartItemsTotalPrice,
          products: cartItems,
          transaction_id: res.data.transaction.id,
        },
      });
      clearCart();
    }
  };

  return (
    <>
      {isGetBrainTreeTokenLoading && (
        <BrainTreeLoaderContainer className="braintree-loader">
          <CircularProgress size={60} />
        </BrainTreeLoaderContainer>
      )}

      {getBrainTreeTokenResult !== null && (
        <>
          <DropIn
            onInstance={(instance) => {
              // this callback runs on mount
              setInstance(instance);
            }}
            options={{ authorization: getBrainTreeTokenResult?.clientToken }}
          />
          <Button
            fullWidth
            isLoading={
              isGetBrainTreeTokenLoading ||
              isProcessPaymentLoading ||
              isCreateOrderLoading ||
              instance === null
            }
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
