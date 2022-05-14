import useEndpoint from "api/useEndpoint";
import EmptyStateHomepage from "assets/empty-state-homepage.svg";
import { Button, CircularProgress, H4, Text } from "haki-ui";
import { useReducer } from "react";
import { ImSpinner11 } from "react-icons/im";
import { Product } from "shared-types";
import Filters from "./Filters";
import { getProductsAboveMinimumPrice } from "./helper/getProductsAboveMinimumPrice";
import { getProductsFilteredOnBasisOfStock } from "./helper/getProductsFilteredOnBasisOfStock";
import { getProductsWithSelectedCategory } from "./helper/getProductsWithSelectedCategory";
import { getSortedProducts } from "./helper/getSortedProducts";
import ProductCard from "./helper/ProductCard";
import Layout from "./Layout";
import {
  filtersReducer,
  selectedFiltersInitialValue,
} from "./reducers/homepageFilters";
import {
  StyledHomepageContainer,
  StyledHomepageError,
  StyledProductCardsContainer,
  StyledSpinnerContainer,
} from "./styles";

const Home = () => {
  const { error, isLoading, result } = useEndpoint<undefined, Product[]>({
    endpoint: "/products",
    preLoadResult: true,
  });

  const [selectedFilters, dispatchFilterActions] = useReducer(
    filtersReducer,
    selectedFiltersInitialValue
  );

  /* filtering and sorting */
  const sortedProducts = getSortedProducts(result, selectedFilters.sortBy);
  const productsAboveMinimumPrice = getProductsAboveMinimumPrice(
    sortedProducts,
    selectedFilters.minimumPrice
  );
  const productsFilteredOnBasisOfStock = getProductsFilteredOnBasisOfStock(
    productsAboveMinimumPrice,
    selectedFilters.doShowOutOfStock
  );
  const productsWithSelectedCategory = getProductsWithSelectedCategory(
    productsFilteredOnBasisOfStock,
    selectedFilters.selectedCategories
  );
  /* filtering and sorting */

  const totalProductsCount = result?.length;
  const visibleProductsCount = productsWithSelectedCategory.length;

  return (
    <Layout maxWidth="95%">
      <StyledHomepageContainer className="homepage-container">
        <aside className="filters">
          <Filters
            dispatchFilterActions={dispatchFilterActions}
            selectedFilters={selectedFilters}
          />
        </aside>

        <section className="products-section">
          {/* 1. error state ✅ */}
          {error && (
            <StyledHomepageError>
              <Text color="danger">{error}</Text>

              <Button
                onClick={() => window.location.reload()}
                startIcon={<ImSpinner11 />}
                variant="ghost"
              >
                reload
              </Button>
            </StyledHomepageError>
          )}

          {/* 2. loading state ✅ */}
          {isLoading && (
            <StyledSpinnerContainer>
              <CircularProgress size={90} />
            </StyledSpinnerContainer>
          )}

          {/* 3. empty state ✅ */}
          {productsWithSelectedCategory.length === 0 && !isLoading && !error && (
            <div className="homepage-empty-state">
              <img alt="empty-state-homepage" src={EmptyStateHomepage} />

              <H4 color="disabled">
                None of the products match the selected filters 😓
              </H4>

              <Button
                onClick={() =>
                  dispatchFilterActions({ type: "RESET_ALL_FILTERS" })
                }
                startIcon={<ImSpinner11 />}
                variant="ghost"
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* 4. products list ✅ */}
          {productsWithSelectedCategory.length > 0 && !isLoading && !error && (
            <>
              <div className="visible-products-count">
                <Text>
                  SHOWING {visibleProductsCount} OUT OF {totalProductsCount}{" "}
                  PRODUCTS
                </Text>
              </div>

              <StyledProductCardsContainer>
                {productsWithSelectedCategory?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </StyledProductCardsContainer>
            </>
          )}
        </section>
      </StyledHomepageContainer>
    </Layout>
  );
};

export default Home;
