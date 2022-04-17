export type CreateCategoryRequest = { name: string };
export type CreateCategoryResponse = {
  createdAt: string;
  name: string;
  updatedAt: string;
  _id: string;
};

export type CreateProductDataInitialState = {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  photo: File | null;
};

export type EditProductDataInitialState = {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
};

export type ProductToBeDeleted = {
  productId: string;
  name: string;
} | null;
