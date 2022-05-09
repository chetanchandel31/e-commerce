import useEndpoint from "api/useEndpoint";
import { Button, CircularProgress, Text } from "haki-ui";
import { ImSpinner11 } from "react-icons/im";
import { Product } from "shared-types";
import Filters from "./Filters";
import ProductCard from "./helper/ProductCard";
import Layout from "./Layout";
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

  return (
    <Layout maxWidth="95%">
      <StyledHomepageContainer className="homepage-container">
        <aside className="filters">
          <Filters />
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
            {result?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </StyledProductCardsContainer>
        </section>
      </StyledHomepageContainer>
    </Layout>
  );
};

export default Home;
