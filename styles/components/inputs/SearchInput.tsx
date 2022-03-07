import styled from 'styled-components';

export const SearchButtonStyled = styled.div`
  background: ${({ theme }) => theme.main.gray};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60px;
  border-radius: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.main.darkgray};
    cursor: pointer;
  }
`;
