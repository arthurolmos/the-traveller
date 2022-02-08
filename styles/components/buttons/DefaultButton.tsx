import styled from 'styled-components';

export const DefaultButtonStyled = styled.div<{ inverted?: boolean }>`
border-width: 3px;
border-style: solid;
border-radius: 25px;
border-color: ${({ theme }) => theme.main.orange};
background: ${({ inverted, theme }) =>
  inverted ? theme.main.orange : theme.main.white};
padding: 5px 10px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all .5s ease;
color ${({ inverted, theme }) =>
  inverted ? theme.main.white : theme.main.orange};

  &:hover {
      color ${({ inverted, theme }) => !inverted && theme.main.darkOrange};
      background ${({ inverted, theme }) => inverted && theme.main.darkOrange};
      border-color: ${({ theme }) => theme.main.darkOrange};
      // font-size: 1.1em;

  }

`;
