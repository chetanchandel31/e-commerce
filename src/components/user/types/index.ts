import { Order, ProductInCart, User, UserInfo } from "shared-types";

export type SignupReqBody = { email: string; name: string; password: string };
export type SignupResponse = User;

export type SigninReqBody = { email: string; password: string };
export type SigninResponse = UserInfo;

export type GetBrainTreeTokenResponse = {
  clientToken: string;
  success: string;
};

export type ProcessPaymentRequest = {
  amount: number;
  nonceFromTheClient: string;
};

export type CreateOrderRequest = {
  order: {
    amount: number;
    products: ProductInCart[];
    transaction_id: string;
  };
};
export type CreateOrderResponse = Order;
