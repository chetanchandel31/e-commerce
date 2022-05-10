import { Product } from "shared-types";

export const getProductsFilteredOnBasisOfStock = (
  products: Product[] | null,
  doShowOutOfStock: boolean
) => {
  if (!products) return [];

  if (!doShowOutOfStock) return products.filter((product) => product.stock > 0);

  return [...products];
};
