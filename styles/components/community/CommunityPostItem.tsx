import styled from 'styled-components';

export const CommunityPostItemStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
  width: 600px;
  height: 250px;
  gap: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 5px 5px 10px lightgray;

  img {
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.main.orange};

    img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 1200px) {
    width: 400px;
    height: 200px;
  }

  @media (max-width: 680px) {
    width: 300px;
    height: 200px;
  }
`;

export const PostImageContainerStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const PostDescriptionContainerStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (max-width: 1200px) {
    > div {
      display: none;
    }
  }
`;
