import React from 'react';
import { IPost } from '../../interfaces';
import {
  ContentStyled,
  PostsSectionStyled,
} from '../../styles/components/posts/PostsSection';
import { CircleLoaderSpinner } from '../spinners/CircleLoader';
import PostListItem from './PostListItem';

interface Props {
  title: string;
  loading: boolean;
  posts: IPost[];
}

export default function PostsSection({ title, loading, posts }: Props) {
  const postsItems = React.useMemo(() => {
    return posts.map((item, index: number) => {
      return <PostListItem item={item} index={index} key={item.id} />;
    });
  }, [posts]);

  return (
    <PostsSectionStyled>
      <h2>{title}</h2>
      <ContentStyled>
        {loading ? (
          <CircleLoaderSpinner loading={loading} />
        ) : (
          <ul>{postsItems}</ul>
        )}
      </ContentStyled>
    </PostsSectionStyled>
  );
}
