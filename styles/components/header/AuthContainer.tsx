import styled from 'styled-components';

export const UserMenuContainerStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    cursor: pointer;
  }

  > span:hover {
    font-weight: bold;
  }
`;

export const AuthContainerStyled = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 1300px) {
    display: none;
  }
`;
