import useEndpoint from "api/useEndpoint";
import { Button, CircularProgress, Text } from "haki-ui";
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

          {isLoading && (
            <StyledSpinnerContainer>
              <CircularProgress size={90} />
            </StyledSpinnerContainer>
          )}

          <StyledProductCardsContainer>
            {productsWithSelectedCategory?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </StyledProductCardsContainer>
        </section>
      </StyledHomepageContainer>
    </Layout>
  );
};

export default Home;
