import { Product } from "shared-types";

export const getProductsWithSelectedCategory = (
  products: Product[] | null,
  selectedCategories: string[]
) => {
  if (!products) return [];

  if (selectedCategories.length === 0) return [...products];

  return products.filter((product) =>
    selectedCategories.includes(product.category._id)
  );
};
