import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

export const ListStyled = styled.ul`
  padding: 0;
  list-style-type: none;
`;

export const ListItemStyled = styled.li<{ index: number }>`
  padding: 10px;
  opacity: 0;
  animation: ${fadeIn};
  animation-duration: ${({ index }) => `calc(${index}s + 3s)`};
  animation-fill-mode: forwards;
  font-size: 12px;

  > h1 {
    color: black;
    font-size: 20px;
  }
`;

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 50px;
  flex: 1;
`;

export const ContentPanelStyled = styled.div`
  display: flex;
  flex: 1;
`;

export const ContentSearchStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 0;
  gap: 20px;
  padding: 0 10px;

  > span {
    text-align: center;
  }
`;

export const ContentReviewsContainer = styled.div`
  height: 500px;
  overflow: auto;
`;

export const ContentMapStyled = styled.div`
  display: flex;
  flex: 2;
`;
