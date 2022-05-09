/* eslint jsx-a11y/control-has-associated-label: 0 */
import useEndpoint from "api/useEndpoint";
import { Button, H4, IconButton, Text } from "haki-ui";
import { useState } from "react";
import { AiOutlineUp } from "react-icons/ai";
import { Category } from "shared-types";
import { StyledFiltersContainer } from "./styles";

const Filters = () => {
  const { isLoading, result } = useEndpoint<undefined, Category[]>({
    endpoint: "/categories",
    preLoadResult: true,
  });

  const [doShowFiltersOnMobile, setDoShowFiltersOnMobile] = useState(false);

  if (isLoading) return <div />;

  return (
    <StyledFiltersContainer doShowFiltersOnMobile={doShowFiltersOnMobile}>
      <div className="filters-header">
        <H4 as="span">FILTERS</H4>
        <Button color="danger" size="sm" variant="ghost">
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
              <input id="price-high-to-low" name="sort-by-price" type="radio" />{" "}
              Price — high to low
            </label>
          </div>
          <div>
            <label htmlFor="price-low-to-high">
              <input id="price-low-to-high" name="sort-by-price" type="radio" />{" "}
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
              <input id="show-only-in-stock" type="checkbox" /> Show only in
              stock
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
                    id={_id}
                    name={name}
                    onChange={({ target }) => console.log(target.value)}
                    type="checkbox"
                    value={name}
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
          {/* TODO: */}
          Minimum price: 🚨
          <input
            className="minimum-price-slider"
            onChange={({ target }) => console.log(target.value)}
            type="range"
            list="tickmarks"
            step={10}
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
