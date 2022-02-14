import styled from 'styled-components';
import { fadeIn } from '../animations';

export const PostListItemStyled = styled.li<{ index: number }>`
  animation: ${fadeIn};
  animation-duration: ${({ index }) => `calc(${index}s + 3s)`};
  animation-fill-mode: forwards;
  transition: color 0.5s ease;
  cursor: pointer;
  border: ${({ theme }) => `1px solid ${theme.main.gray}`};
  border-radius: 15px 0 0 15px;
  padding: 10px;

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
