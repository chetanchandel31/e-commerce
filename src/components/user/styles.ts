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
    padding: 1rem;
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
  }

  & .cart-empty-state > button {
    margin-top: 1rem;
  }

  @media (max-width: 42em) {
    flex-direction: column;

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
