import styled from "styled-components";

export const FooterStyled = styled.footer`
  border-top: 1px solid gray;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: row;
  flex: 1;

  svg {
    transition: all 0.5s ease;
    cursor: pointer;
  }

  svg:hover {
    color: #c86420;
  }
`;

export const FooterContainerStyled = styled.div`
  display: flex;
  flex: 1;
  // justify-content: center;
  align-items: center;
`;

export const FooterContainerLeftStyled = styled(FooterContainerStyled)`
  gap: 20px;
`;

export const FooterContainerRightStyled = styled(FooterContainerStyled)`
  display: flex;
  justify-content: end;
`;

export const FooterStyledLink = styled.a`
  text-decoration: underline;
  font-weight: bold;
  transition: all 0.5s ease;

  &:hover {
    color: #c86420;
  }
`;
