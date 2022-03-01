import React from 'react';
import { IPost } from '../../models';
import {
  ContentStyled,
  PostsSectionStyled,
} from '../../styles/components/posts/PostsSection';
import { ClipLoaderSpinner } from '../spinners/ClipLoader';
import PostListItem from './PostListItem';

interface Props {
  title: string;
  loading: boolean;
  posts: IPost[];
  preview?: boolean;
}

export default function PostsSection({
  title,
  loading,
  posts,
  preview = false,
}: Props) {
  const postsItems = React.useMemo(() => {
    return posts.map((item, index: number) => {
      return (
        <PostListItem
          item={item}
          index={index}
          key={item.id}
          preview={preview}
        />
      );
    });
  }, [posts]);

  return (
    <PostsSectionStyled title={title}>
      <h2>{title}</h2>
      <ContentStyled>
        {loading ? (
          <ClipLoaderSpinner loading={loading} />
        ) : (
          <ul>{postsItems}</ul>
        )}
      </ContentStyled>
    </PostsSectionStyled>
  );
}
