import React from 'react';
import Link from 'next/link';
import { IPost } from '../../models';
import { PostListItemStyled } from '../../styles/components/posts/PostListItem';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import { Timestamp } from 'firebase/firestore';

interface Props {
  item: IPost;
  index: number;
  preview?: boolean;
}

export default function PostListItem({ item, index, preview }: Props) {
  const href = preview ? `/posts/preview/${item.id}` : `/posts/${item.id}`;

  const createdAt = convertTimestampToDate(item.createdAt as Timestamp);
  const approvedAt = item.approvedAt
    ? convertTimestampToDate(item.approvedAt as Timestamp)
    : null;

  return (
    <Link href={href} passHref>
      <PostListItemStyled key={item.id} index={index}>
        <h3>{item.title}</h3>
        <span>Published at: {createdAt}</span>
        {approvedAt && <span>Approved at: {approvedAt}</span>}
      </PostListItemStyled>
    </Link>
  );
}
