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

export type Order = {
  amount: number;
  createdAt: string;
  products: Product[];
  status: "Cancelled" | "Delivered" | "Shipped" | "Processing" | "Received";
  transaction_id: string;
  updatedAt: string;
  user: User;
  _id: string;
};
