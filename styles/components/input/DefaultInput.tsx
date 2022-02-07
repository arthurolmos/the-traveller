import styled from "styled-components";

export const DefaultInputStyled = styled.input`
  border: ${({ theme }) => `1px solid ${theme.main.gray}`};
  border-radius: 15px;
  padding: 10px 15px;
  color: ${({ theme }) => `${theme.main.gray}`};
  width: 100%;

  &:focus {
    outline: none;
  }
`;
