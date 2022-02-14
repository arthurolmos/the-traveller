import React from 'react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import MainContainer from '../../components/layouts/MainContainer';
import PageComponent from '../../components/layouts/PageComponent';
import { db, collection, onSnapshot, query, where } from '../../firebase/db';
import { IPost } from '../../interfaces';
import { PostsGridStyled } from '../../styles/pages/posts/Posts';
import PostsSection from '../../components/posts/PostsSection';

export function Posts() {
  const AuthUser = useAuthUser();
  const uid = AuthUser.id;

  const [publishedPosts, setPublishedPosts] = React.useState<IPost[]>([]);
  const [loadingPublishedPosts, setLoadingPublishedPosts] =
    React.useState(false);
  const [postsUnderReview, setPostsUnderReview] = React.useState<IPost[]>([]);
  const [loadingPostsUnderReview, setLoadingPostsUnderReview] =
    React.useState(false);

  React.useEffect(() => {
    setLoadingPublishedPosts(true);
    setLoadingPostsUnderReview(true);

    const publishedQuery = query(
      collection(db, 'posts'),
      where('review', '==', false),
      where('author', '==', uid)
    );

    const unsubPublished = onSnapshot(publishedQuery, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        post.id = doc.id;
        posts.push(post);
      });
      setLoadingPublishedPosts(false);
      setPublishedPosts([...posts]);
    });

    const reviewQuery = query(
      collection(db, 'posts'),
      where('review', '==', true),
      where('author', '==', uid)
    );

    const unsubUnderReview = onSnapshot(reviewQuery, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        post.id = doc.id;
        posts.push(post);
      });
      setLoadingPostsUnderReview(false);
      setPostsUnderReview([...posts]);
    });

    return () => {
      unsubUnderReview();
      unsubPublished();
    };
  }, []);

  return (
    <MainContainer title="My Posts">
      <PageComponent title="My Posts">
        <PostsGridStyled>
          <PostsSection
            posts={publishedPosts}
            title="Published Posts"
            loading={loadingPublishedPosts}
          />

          <PostsSection
            posts={postsUnderReview}
            title="Posts under Review"
            loading={loadingPostsUnderReview}
          />

          <PostsSection
            posts={postsUnderReview}
            title="Posts under Review"
            loading={loadingPostsUnderReview}
          />
        </PostsGridStyled>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Posts);
