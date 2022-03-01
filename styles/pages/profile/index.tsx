import styled from 'styled-components';

export const ProfileHeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ImageContainerStyled = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  object-fit: cover;
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
