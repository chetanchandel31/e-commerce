import styled from "styled-components";

type StyledHeaderContainerProps = {
  color: string;
};

type StyledProductCardProps = {
  isOutOfStock: boolean;
};

type StyledLayoutContainerProps = {
  maxWidth?: string;
};

type StyledFiltersContainerProps = {
  doShowFiltersOnMobile: boolean;
};

const BREAKPOINT_FOR_TOGGLING_HOMEPAGE_LAYOUT = "83em";

export const StyledHeaderContainer = styled.nav<StyledHeaderContainerProps>`
  background-color: ${({ color }) => color};
  padding: 1rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 20;
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

export const StyledLayoutContainer = styled.div<StyledLayoutContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || `62rem`};
  margin: auto;
  margin-top: 50px;
  padding: 0 8px;

  flex-grow: 1;

  & > h2,
  > h4 {
    text-align: center;
  }

  & > h2 {
    margin-top: 2rem;
  }

  & > h4 {
    margin-top: 0.5rem;
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

  & .quantity-counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .product-card-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > h5 {
      text-align: center;
    }
  }

  & .price-category-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0.5rem 0 0 0;
  }

  & .cart-btn {
    margin-top: 0.5rem;
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

export const StyledFooter = styled.footer`
  padding: 0 2rem 2rem 2rem;

  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  & > div {
    padding-top: 2rem;
    border-top: solid 1px rgba(0, 0, 0, 0.26);
    width: 100%;
    text-align: center;
  }
`;

export const StyledHomepageContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: ${BREAKPOINT_FOR_TOGGLING_HOMEPAGE_LAYOUT}) {
    flex-direction: column;
  }

  & .filters {
    flex-grow: 1;
  }

  & .products-section {
    width: 62rem;

    @media (max-width: ${BREAKPOINT_FOR_TOGGLING_HOMEPAGE_LAYOUT}) {
      width: 100%;
    }
  }

  & .homepage-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;

    & > img {
      width: 90%;
      max-width: 600px;
    }
  }

  & .visible-products-count {
    margin-bottom: 1.5rem;
  }
`;

export const StyledFiltersContainer = styled.div<StyledFiltersContainerProps>`
  & .filters-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .expand-filters-btn {
    transform: ${({ doShowFiltersOnMobile }) =>
      doShowFiltersOnMobile ? `rotate(0deg)` : `rotate(-180deg)`};
    transition: transform 0.5s;

    @media (min-width: ${BREAKPOINT_FOR_TOGGLING_HOMEPAGE_LAYOUT}) {
      display: none;
    }
  }

  & .filter-sections-container {
    margin-top: 1rem;

    @media (max-width: ${BREAKPOINT_FOR_TOGGLING_HOMEPAGE_LAYOUT}) {
      height: ${({ doShowFiltersOnMobile }) =>
        doShowFiltersOnMobile ? `45vh` : `0`};
      overflow: hidden auto;
      transition: height 0.5s;
      padding-right: 1rem;

      &::-webkit-scrollbar {
        width: 0.5rem;
        background-color: rgba(0, 0, 0, 0.12);
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.26);
        border-radius: 5rem;
      }
    }

    & > div {
      padding: 1rem 0;
      border-bottom: solid 1px rgba(0, 0, 0, 0.26);
    }
  }

  & .filter-section-heading {
    margin-bottom: 1rem;
  }

  & .single-category-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  & .minimum-price-slider {
    width: 100%;
  }

  & .price-slider-datalist {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-top: 0px;
  }

  & .price-slider-option {
    min-width: 26px;
  }
`;
