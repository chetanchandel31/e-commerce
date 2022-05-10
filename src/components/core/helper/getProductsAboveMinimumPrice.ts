import { Product } from "shared-types";

export const getProductsAboveMinimumPrice = (
  products: Product[] | null,
  minimumPrice: number
) => {
  if (!products) return [];

  return products.filter((product) => product.price >= minimumPrice);
};
