import styled from 'styled-components';
import { PostListItemStyled } from '../components/posts/PostListItem';

export const CommunityPostsGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 20px;
`;

export const ImageContainerStyled = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  width: 200px;
  height: 200px;
`;

export const CommunityPostListItemStyled = styled(PostListItemStyled)`
  flex-direction: row;
  gap: 20px;
`;

export const DescriptionContainerStyled = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
`;
