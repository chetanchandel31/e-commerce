import styled from "styled-components";

type StyledHeaderContainerProps = {
  color: string;
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

  & a {
    text-decoration: none;
    color: #fff;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 62rem;
  margin: auto;
  text-align: center;

  flex-grow: 1;
`;
