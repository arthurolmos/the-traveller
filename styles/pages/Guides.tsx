import styled from 'styled-components';

export const GuidesContentStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
