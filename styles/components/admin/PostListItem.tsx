import styled from 'styled-components';
import { PostListItemStyled } from '../posts/PostListItem';

export const AdminPostListItemStyled = styled(PostListItemStyled)`
  flex-direction: row;
  cursor: auto;
  width: 600px;
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
`;
