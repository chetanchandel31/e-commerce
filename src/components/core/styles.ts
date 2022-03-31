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
