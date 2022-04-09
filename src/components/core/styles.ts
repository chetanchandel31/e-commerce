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
`;
