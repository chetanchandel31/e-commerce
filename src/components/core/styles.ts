import styled from "styled-components";

type StyledHeaderContainerProps = {
  color: string;
};

type StyledProductCardProps = {
  isOutOfStock: boolean;
};

export const StyledHeaderContainer = styled.nav<StyledHeaderContainerProps>`
  background-color: ${({ color }) => color};
  padding: 1rem;
`;

export const StyledNavMenuContainer = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  & a,
  .nav-link {
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }

  & .signout-nav-item {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 62rem;
  margin: auto;
  padding: 0 8px;

  flex-grow: 1;

  & > h2,
  h4 {
    text-align: center;
  }

  & > h2 {
    margin-top: 1rem;
  }

  & > h4 {
    margin-bottom: 2rem;
  }
`;

export const StyledProductCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  & > div {
    flex-basis: calc(33.33% - 10px);
  }

  @media (max-width: 45em) {
    & > div {
      flex-basis: 100%;
    }
  }
`;

export const StyledProductCard = styled.div<StyledProductCardProps>`
  position: relative;
  cursor: ${({ isOutOfStock }) => (isOutOfStock ? "not-allowed" : "")};
  user-select: ${({ isOutOfStock }) => (isOutOfStock ? "none" : "auto")};

  & .product-card-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
  }

  & .price-category-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0.5rem 0;
  }

  & .out-of-stock {
    color: #fff;
    text-align: center;
    font-weight: 400;
    font-size: 2.25rem;
  }
`;

export const StyledHomepageError = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

export const StyledSpinnerContainer = styled.div`
  padding: 5rem;

  & > div {
    margin: auto;
  }
`;
