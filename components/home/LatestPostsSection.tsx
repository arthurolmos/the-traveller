import Link from 'next/link';
import React from 'react';
import { IPost } from '../../interfaces';
import {
  GridStyled,
  LinkStyled,
} from '../../styles/components/home/LatestPostsSection';
import { CommunityPostItem } from '../community/CommunityPostItem';
import HomeSection from './HomeSection';

interface Props {
  latestPosts: IPost[];
}

export default function LatestPostsSection({ latestPosts }: Props) {
  return (
    <HomeSection title="Latest Community Posts">
      <GridStyled>
        {latestPosts.map((post) => {
          return <CommunityPostItem post={post} key={post.id} />;
        })}
      </GridStyled>
      <Link href="/community" passHref>
        <LinkStyled>View more Posts</LinkStyled>
      </Link>
    </HomeSection>
  );
}
