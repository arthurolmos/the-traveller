import styled from 'styled-components';
import { fadeIn } from '../components/animations';

export const ListStyled = styled.ul`
  padding: 0;
  list-style-type: none;
  flex: 1;
`;

export const ListItemStyled = styled.li<{ index: number }>`
  padding: 10px;
  opacity: 0;
  animation: ${fadeIn};
  animation-duration: ${({ index }) => `calc(${index}s + 3s)`};
  animation-fill-mode: forwards;
  font-size: 12px;
  border-radius: 25px;
  box-shadow: 10px 10px 10px lightgray;
  width: 90%;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    color: ${({ theme }) => theme.main.orange};
  }
`;

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 50px;
  flex: 1;

  @media (max-width: 600px) {
    flex-direction: column;
  }
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
  display: flex;
`;

export const ContentReviewsDefaultContainer = styled(ContentReviewsContainer)`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const ContentReviewsSmallContainer = styled(ContentReviewsContainer)`
  @media (min-width: 600px) {
    display: none;
  }
`;

export const ContentMapStyled = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 20px;
`;
