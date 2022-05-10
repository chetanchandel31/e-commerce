import { HomepageProductSortType } from "../reducers/homepageFilters";

export type FILTERS_ACTION_TYPE =
  | { type: "TOGGLE_DO_SHOW_OUT_OF_STOCK" }
  | { type: "RESET_ALL_FILTERS" }
  | {
      type: "SORT_BY_PRICE";
      payload: { sortType: HomepageProductSortType };
    }
  | { type: "SELECT_OR_UNSELECT_CATEGORY"; payload: { categoryId: string } }
  | { type: "SET_MINIMUM_PRICE"; payload: number };
