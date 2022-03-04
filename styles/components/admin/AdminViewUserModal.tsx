import styled from 'styled-components';

export const AdminViewUserProfileHeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AdminViewUserPostsContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const AdminViewUserPostsContainerHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const AdminViewUserPostsGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const AdminViewUserImageContainerStyled = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
`;

export const AdminViewUserContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const AdminViewUserSocialNetworkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const AdminViewUserSocialNetworkWrapper = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 5px;

  > svg {
    stroke: ${({ theme }) => theme.main.orange};
    fill: ${({ theme }) => theme.main.orange};
  }

  &: hover {
    opacity: 0.8;
  }
`;

export const UserPostsLengthStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.main.orange};
  font-weight: bold;
  color: white;
  min-width: 30px;
  min-height: 30px;
`;
