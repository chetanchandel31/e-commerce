import { HomepageProductSortType } from "../reducers/homepageFilters";

export const isValidSortType = (
  string: string | null
): string is HomepageProductSortType =>
  string === "high to low" || string === "low to high" || string === null;
