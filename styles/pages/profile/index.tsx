import styled from 'styled-components';

export const ProfileHeaderStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const ImageContainerWrapperStyled = styled.div`
  position: relative;
  transition: opacity 0.5s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ImageContainerStyled = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
`;

export const CameraIconContainerStyled = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
  zindex: 1;
  background: white;
  border: 1px solid black;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserPostsContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const UserPostsContainerHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const UserPostsGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ProfileDescriptionStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;

export const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const ProfileSocialStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;
