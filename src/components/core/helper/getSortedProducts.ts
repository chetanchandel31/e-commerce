import { Product } from "shared-types";
import { HomepageProductSortType } from "../reducers/homepageFilters";

export const getSortedProducts = (
  products: Product[] | null,
  sortBy: HomepageProductSortType
) => {
  if (!products) return [];

  if (sortBy === "high to low") {
    return [...products].sort((a, b) => b.price - a.price);
  }
  if (sortBy === "low to high") {
    return [...products].sort((a, b) => a.price - b.price);
  }
  return [...products];
};
