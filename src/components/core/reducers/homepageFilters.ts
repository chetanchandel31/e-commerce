import { FILTERS_ACTION_TYPE } from "../actions/homepageFilters";

export type HomepageProductSortType = "high to low" | "low to high" | null;

export type HomepageFilters = {
  doShowOutOfStock: boolean;
  minimumPrice: number;
  selectedCategories: string[];
  sortBy: HomepageProductSortType;
};

export const selectedFiltersInitialValue: HomepageFilters = {
  doShowOutOfStock: true,
  minimumPrice: 0,
  selectedCategories: [],
  sortBy: null,
};

export const filtersReducer = (
  state: HomepageFilters,
  action: FILTERS_ACTION_TYPE
): HomepageFilters => {
  switch (action.type) {
    case "RESET_ALL_FILTERS": {
      return { ...selectedFiltersInitialValue };
    }

    case "SELECT_OR_UNSELECT_CATEGORY": {
      const updatedCategories = state.selectedCategories.includes(
        action.payload.categoryId
      )
        ? state.selectedCategories.filter(
            (categoryId) => categoryId !== action.payload.categoryId
          )
        : [...state.selectedCategories, action.payload.categoryId];

      return { ...state, selectedCategories: updatedCategories };
    }

    case "SET_MINIMUM_PRICE": {
      return { ...state, minimumPrice: action.payload };
    }

    case "SORT_BY_PRICE": {
      return { ...state, sortBy: action.payload.sortType };
    }

    case "TOGGLE_DO_SHOW_OUT_OF_STOCK": {
      return { ...state, doShowOutOfStock: !state.doShowOutOfStock };
    }

    default: {
      return { ...state };
    }
  }
};
