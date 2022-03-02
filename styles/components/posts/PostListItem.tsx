import styled from 'styled-components';
import { fadeIn } from '../animations';

export const PostListItemStyled = styled.li<{ index: number }>`
  animation: ${fadeIn};
  animation-duration: ${({ index }) => `calc(${index}s + 3s)`};
  animation-fill-mode: forwards;
  transition: color 0.3s ease;
  cursor: pointer;
  padding: 20px;
  width: 100%;
  border-radius: 15px;
  box-shadow: 10px 10px 10px lightgray;

  display: flex;
  flex: 1;
  flex-direction: column;

  > h3 {
    text-align: left;
  }

  &:hover {
    color: ${({ theme }) => theme.main.orange};
  }
`;
