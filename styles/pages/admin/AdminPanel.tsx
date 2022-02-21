import styled from 'styled-components';

export const PostTabContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabRowStyled = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: ${({ theme }) => `1px solid ${theme.main.gray}`};
  margin-bottom: 25px;
`;

export const TabItemStyled = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-right: ${({ theme }) => `1px solid ${theme.main.gray}`};
  background: ${({ selected, theme }) =>
    selected ? theme.main.white : theme.main.lightgray};
  flex: 1;
  font-weight: bold;

  &:last-child {
    border: none;
  }
`;

export const PostContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
