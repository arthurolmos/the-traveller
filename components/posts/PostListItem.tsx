import React from 'react';
import Link from 'next/link';
import { IPost } from '../../interfaces';
import { PostListItemStyled } from '../../styles/components/posts/PostListItem';

interface Props {
  item: IPost;
  index: number;
  preview?: boolean;
}

export default function PostListItem({ item, index, preview }: Props) {
  const href = preview ? `/posts/preview/${item.id}` : `/posts/${item.id}`;

  return (
    <Link href={href} passHref>
      <PostListItemStyled key={item.id} index={index}>
        <h3>{item.title}</h3>
        <span>Published at: ...</span>
        <div>{item.author}</div>
      </PostListItemStyled>
    </Link>
  );
}