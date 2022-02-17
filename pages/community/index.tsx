import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import React from 'react';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import {
  db,
  collection,
  where,
  orderBy,
  limit,
  query,
  getDocs,
} from '../../firebase/db';
import { storage, ref, getDownloadURL } from '../../firebase/storage';
import { IPost, IPostStatus } from '../../interfaces';
import MainContainer from '../../components/layouts/MainContainer';
import PageComponent from '../../components/layouts/PageComponent';
import {
  CommunityPostListItemStyled,
  CommunityPostsGridStyled,
  DescriptionContainerStyled,
  ImageContainerStyled,
} from '../../styles/pages/Community';
import DefaultImage from '../../components/image/DefaultImage';

interface Props {
  posts: IPost[];
}

function PostListItem({ post, index }: { post: IPost; index: number }) {
  const [coverImage, setCoverImage] = React.useState(null);

  const shortDescription = post.text.split(' ').slice(0, 10).join(' ');

  React.useEffect(() => {
    async function getCoverImage() {
      try {
        const coverImageRef = ref(
          storage,
          `posts/${post.id}/${post.coverImage}`
        );
        const url = await getDownloadURL(coverImageRef);

        setCoverImage(url);
      } catch (err) {
        console.error(err);

        setCoverImage(null);
      }
    }

    getCoverImage();
  }, [post]);

  return (
    <CommunityPostListItemStyled index={index}>
      <ImageContainerStyled>
        <DefaultImage src={coverImage} layout="fill" objectFit="cover" />
      </ImageContainerStyled>

      <DescriptionContainerStyled>
        <h2>{post.title}</h2>
        <span>By {post.authorName}</span>
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      </DescriptionContainerStyled>
    </CommunityPostListItemStyled>
  );
}

export function Community({ posts }: Props) {
  return (
    <MainContainer title="Community">
      <PageComponent title="Community">AAAA</PageComponent>

      <CommunityPostsGridStyled>
        {posts.map((item, index) => {
          return <PostListItem key={item.id} post={item} index={index} />;
        })}
      </CommunityPostsGridStyled>
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
