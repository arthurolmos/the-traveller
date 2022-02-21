import styled from 'styled-components';
import { PostListItemStyled } from '../posts/PostListItem';

export const AdminPostListItemStyled = styled(PostListItemStyled)`
  display: flex;
  flex-direction: row;
  cursor: auto;
  width: 600px;

  @media (max-width: 860px) {
    flex-direction: column;
    width: 300px;
    gap: 20px;
  }
`;

export const PostDescriptionStyled = styled.div`
  flex: 2;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

export const ItemButtonsStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;

  @media (max-width: 860px) {
    flex-direction: row;
  }
`;
