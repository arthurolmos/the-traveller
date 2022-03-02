import styled from 'styled-components';

export const FooterStyled = styled.footer`
  border-top: 1px solid gray;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: row;
  flex: 1;
  background: ${({ theme }) => theme.main.white};

  svg {
    transition: all 0.3s ease;
    cursor: pointer;
  }

  svg:hover {
    color: ${({ theme }) => theme.main.orange};
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
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.main.orange};
  }
`;
