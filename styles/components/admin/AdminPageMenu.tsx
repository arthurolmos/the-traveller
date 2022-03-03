import styled from 'styled-components';

export const AdminPageMenuStyled = styled.aside`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  ul {
    list-style: none;
  }
`;

export const AdminPageMenuListItemStyled = styled.li<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  border-bottom: ${({ theme }) => `1px solid ${theme.main.lightgray}`};
  font-weight: ${({ active }) => (active ? 'bold' : 'regular')};

  &:hover {
    font-weight: bold;
  }
`;

export const AdminPagePostsLengthStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.main.orange};
  font-weight: bold;
  color: white;
  min-width: 20px;
  min-height: 20px;
  max-width: 30px;
  max-height: 30px;
  font-size: 12px;
`;
