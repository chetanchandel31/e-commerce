export type User = {
  email: string;
  name: string;
  role: number;
  _id: string;
};

export type UserInfo = {
  token: string;
  user: User;
};

export type Category = {
  createdAt: string;
  name: string;
  updatedAt: string;
  _id: string;
};

export type Product = {
  category: Category;
  createdAt: string;
  description: string;
  name: string;
  photo: {
    contentType: string;
    data: {
      data: Buffer;
      type: Buffer;
    };
  };
  price: number;
  sold: number;
  stock: number;
  updatedAt: string;
  _id: string;
};

// is with us locally
export type ProductInCart = {
  count: number;
  name: string;
  price: number;
  /** product._id */
  product: string;
};

// comes from DB
export type ProductInOrder = {
  count: number;
  _id: string;
  name: string;
  price: number;
  product?: Product;
};

export type Order = {
  amount: number;
  createdAt: string;
  products: ProductInOrder[];
  status: "Cancelled" | "Delivered" | "Shipped" | "Processing" | "Received";
  transaction_id: string;
  updatedAt: string;
  user: User;
  _id: string;
};
