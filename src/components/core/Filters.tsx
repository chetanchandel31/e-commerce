/* eslint jsx-a11y/control-has-associated-label: 0 */
import useEndpoint from "api/useEndpoint";
import { Button, H4, IconButton, Text } from "haki-ui";
import { ChangeEvent, Dispatch, useState } from "react";
import { AiOutlineUp } from "react-icons/ai";
import { Category } from "shared-types";
import { FILTERS_ACTION_TYPE } from "./actions/homepageFilters";
import { isValidSortType } from "./helper/isValidSortType";
import { HomepageFilters } from "./reducers/homepageFilters";
import { StyledFiltersContainer } from "./styles";

type FiltersProps = {
  dispatchFilterActions: Dispatch<FILTERS_ACTION_TYPE>;
  selectedFilters: HomepageFilters;
};

const Filters = ({ dispatchFilterActions, selectedFilters }: FiltersProps) => {
  const { isLoading, result } = useEndpoint<undefined, Category[]>({
    endpoint: "/categories",
    preLoadResult: true,
  });

  const { doShowOutOfStock, minimumPrice, selectedCategories, sortBy } =
    selectedFilters;

  const [doShowFiltersOnMobile, setDoShowFiltersOnMobile] = useState(false);

  const handleSort = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (isValidSortType(target.value)) {
      dispatchFilterActions({
        type: "SORT_BY_PRICE",
        payload: { sortType: target.value },
      });
    } else {
      console.error(`${target.value} isn't a valid sort type`);
    }
  };

  if (isLoading) return <div />;

  return (
    <StyledFiltersContainer doShowFiltersOnMobile={doShowFiltersOnMobile}>
      <div className="filters-header">
        <H4 as="span">FILTERS</H4>
        <Button
          color="danger"
          onClick={() => dispatchFilterActions({ type: "RESET_ALL_FILTERS" })}
          size="sm"
          variant="ghost"
        >
          clear filters
        </Button>
        <span className="expand-filters-btn">
          <IconButton
            circular
            icon={<AiOutlineUp />}
            onClick={() => setDoShowFiltersOnMobile((prev) => !prev)}
          />
        </span>
      </div>

      <div className="filter-sections-container">
        <div>
          <div className="filter-section-heading">
            <Text color="primary">SORT BY</Text>
          </div>

          <div>
            <label htmlFor="price-high-to-low">
              <input
                checked={sortBy === "high to low"}
                id="price-high-to-low"
                name="sort-by-price"
                onChange={handleSort}
                type="radio"
                value="high to low"
              />{" "}
              Price — high to low
            </label>
          </div>
          <div>
            <label htmlFor="price-low-to-high">
              <input
                checked={sortBy === "low to high"}
                id="price-low-to-high"
                name="sort-by-price"
                onChange={handleSort}
                type="radio"
                value="low to high"
              />{" "}
              Price — low to high
            </label>
          </div>
        </div>

        <div>
          <div className="filter-section-heading">
            <Text color="primary">OUT OF STOCK</Text>
          </div>

          <div>
            <label htmlFor="show-only-in-stock">
              <input
                checked={!doShowOutOfStock}
                onChange={() =>
                  dispatchFilterActions({ type: "TOGGLE_DO_SHOW_OUT_OF_STOCK" })
                }
                id="show-only-in-stock"
                type="checkbox"
              />{" "}
              Show only in stock
            </label>
          </div>
        </div>

        {result && result.length > 0 && (
          <div>
            <div className="filter-section-heading">
              <Text color="primary">CATEGORIES</Text>
            </div>

            {result.map(({ _id, name }) => (
              <div key={_id}>
                <label className="single-category-label" htmlFor={_id}>
                  <input
                    checked={selectedCategories.includes(_id)}
                    id={_id}
                    name={name}
                    onChange={({ target }) =>
                      dispatchFilterActions({
                        type: "SELECT_OR_UNSELECT_CATEGORY",
                        payload: { categoryId: target.value },
                      })
                    }
                    type="checkbox"
                    value={_id}
                  />{" "}
                  {/* just capitalising first alphabet */}
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </label>
              </div>
            ))}
          </div>
        )}

        <div>
          <div className="filter-section-heading">
            <Text color="primary">FILTER BY PRICE</Text>
          </div>
          Minimum price: {minimumPrice}
          <input
            className="minimum-price-slider"
            onChange={({ target }) =>
              dispatchFilterActions({
                type: "SET_MINIMUM_PRICE",
                payload: Number(target.value),
              })
            }
            type="range"
            list="tickmarks"
            step={10}
            value={minimumPrice}
          />
          <datalist className="price-slider-datalist" id="tickmarks">
            <option className="price-slider-option" value="0" label="0" />
            <option value="10" />
            <option value="20" />
            <option value="30" />
            <option value="40" />
            <option className="price-slider-option" value="50" label="50" />
            <option value="60" />
            <option value="70" />
            <option value="80" />
            <option value="90" />
            <option className="price-slider-option" value="100" label="100" />
          </datalist>
        </div>
      </div>
    </StyledFiltersContainer>
  );
};

export default Filters;
