import styled from 'styled-components';

export const GridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const LinkStyled = styled.a`
  transition: color 0.5s ease;

  &:hover {
    color: ${({ theme }) => theme.main.orange};
  }
`;
