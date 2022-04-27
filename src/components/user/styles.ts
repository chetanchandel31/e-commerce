import styled from "styled-components";

export const StyledAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 90%;
  max-width: 400px;
  margin: auto;
  margin-top: 6rem;

  & > button {
    margin-top: 1rem;
  }
`;

export const AdminNavbar = styled.div`
  padding: 0.5rem 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.26);
  text-align: center;
  display: flex;
  overflow: auto;
`;

export const AdminProfileContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-around;

  @media (max-width: 40em) {
    flex-direction: column;
  }
`;

export const StyledCartContainer = styled.div`
  display: flex;
  gap: 1rem;

  & .cart-items {
    flex-basis: calc(313px + 2rem);
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & .order-panel {
    flex: 1;
  }

  & .or {
    text-align: center;
    margin: 2rem 0;
  }

  & .cart-empty-state {
    text-align: center;
    margin-top: 2rem;
  }

  & .empty-cart-img-container {
    text-align: center;

    & > img {
      width: 90%;
    }
  }

  & .cart-empty-state > button {
    margin-top: 1rem;
  }

  @media (max-width: 42em) {
    flex-direction: column-reverse;

    & .cart-items {
      flex-basis: auto;
    }
  }
`;

export const BrainTreeLoaderContainer = styled.div`
  padding: 6rem;

  & > div {
    margin: auto;
  }
`;

export const StyledPricingDetailsContainer = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 4px;

  & .individual-products-container {
    padding: 0 0 0.5rem 0;
  }

  & .individual-product {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  & .price-total {
    display: flex;
    justify-content: space-between;
    border-top: solid 1px rgba(0, 0, 0, 0.26);
    padding: 0.5rem 0;
  }
`;
