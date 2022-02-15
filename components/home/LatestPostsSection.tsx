import React from 'react';
import { IPost } from '../../interfaces';
import { GridStyled } from '../../styles/components/home/LatestPostsSection';
import HomeSection from './HomeSection';
import { LatestPostItem } from './LatestPostItem';

interface Props {
  latestPosts: IPost[];
}

export default function LatestPostsSection({ latestPosts }: Props) {
  return (
    <HomeSection title="Latest Community Posts">
      <GridStyled>
        {latestPosts.map((post) => {
          return <LatestPostItem post={post} />;
        })}
      </GridStyled>
    </HomeSection>
  );
}
