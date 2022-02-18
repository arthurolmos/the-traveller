import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import React from 'react';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import {
  db,
  collection,
  where,
  orderBy,
  query,
  getDocs,
} from '../../firebase/db';
import { IPost, IPostStatus } from '../../interfaces';
import { MainContainer, PageComponent } from '../../components/layouts';
import { CommunityPostsGridStyled } from '../../styles/pages/Community';
import { CommunityPostItem } from '../../components/community/CommunityPostItem';

interface Props {
  posts: IPost[];
}

export function Community({ posts }: Props) {
  return (
    <MainContainer title="Community">
      <PageComponent title="Community">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
          impedit quo. Harum atque reprehenderit aliquam odio, illo ullam
          provident numquam.
        </p>
        <CommunityPostsGridStyled>
          {posts.map((item) => {
            return <CommunityPostItem key={item.id} post={item} />;
          })}
        </CommunityPostsGridStyled>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({})(async () => {
  const latestPostsQuery = query(
    collection(db, 'posts'),
    where('status', '==', IPostStatus.APPROVED),
    orderBy('approvedAt', `desc`)
  );

  const docs = await getDocs(latestPostsQuery);

  const posts = [];
  docs.forEach((doc) => {
    const post = doc.data();
    post.id = doc.id;

    post.createdAt = convertTimestampToDate(post.createdAt);
    post.updatedAt = convertTimestampToDate(post.updatedAt);
    post.approvedAt = convertTimestampToDate(post.approvedAt);

    posts.push(post);
  });

  return {
    props: {
      posts,
    },
  };
});

export default withAuthUser<Props>()(Community);
