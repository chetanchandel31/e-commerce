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
