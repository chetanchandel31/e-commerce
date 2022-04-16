import styled from "styled-components";

export const StyledCreateCategoryForm = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;

export const StyledCreateProductForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  padding: 2rem 1rem;
`;

export const StyledManageProductsContainer = styled.div`
  padding: 2rem 1rem;

  & .product-list-container {
    margin-top: 1rem;
  }

  & .product-list-item {
    border-bottom: solid 1px rgba(0, 0, 0, 0.26);
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .loading-state-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;
