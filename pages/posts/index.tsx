import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import React from 'react';
import MainContainer from '../../components/layout/MainContainer';
import PageComponent from '../../components/layout/PageComponent';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/db';
import { CircleLoaderSpinner } from '../../components/spinners/CircleLoader';

export function Posts() {
  const AuthUser = useAuthUser();
  const uid = AuthUser.id;

  const [publishedPosts, setPublishedPosts] = React.useState([]);
  const [loadingPublishedPosts, setLoadingPublishedPosts] =
    React.useState(false);
  const [postsUnderReview, setPostsUnderReview] = React.useState([]);
  const [loadingPostsUnderReview, setLoadingPostsUnderReview] =
    React.useState(false);

  React.useEffect(() => {
    setLoadingPublishedPosts(true);
    setLoadingPostsUnderReview(true);

    const publishedQuery = query(
      collection(db, 'posts'),
      where('review', '==', false),
      where('uid', '==', uid)
    );

    const unsubUnderReview = onSnapshot(publishedQuery, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setLoadingPublishedPosts(false);
      setPublishedPosts([...posts]);
    });

    const reviewQuery = query(
      collection(db, 'posts'),
      where('review', '==', true),
      where('uid', '==', uid)
    );
    const unsubPublished = onSnapshot(reviewQuery, (querySnapshot) => {
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

  const publishedPostsItems = React.useMemo(() => {
    return publishedPosts.map((item) => {
      return (
        <div key={item.id}>
          <div>{item.id}</div>
          <div>{item.title}</div>
          <div>{item.uid}</div>
        </div>
      );
    });
  }, [publishedPosts]);

  const postsUnderReviewItems = React.useMemo(() => {
    return postsUnderReview.map((item) => {
      return (
        <div key={item.id}>
          <div>{item.id}</div>
          <div>{item.title}</div>
          <div>{item.uid}</div>
        </div>
      );
    });
  }, [postsUnderReview]);

  React.useEffect(() => {
    console.log({ publishedPosts, postsUnderReview });
  }, [publishedPosts, postsUnderReview]);

  return (
    <MainContainer title="My Posts">
      <PageComponent title="My Posts">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <h2
              style={{
                textAlign: 'center',
              }}
            >
              Posts awaiting review
            </h2>
            <div>
              {loadingPostsUnderReview ? (
                <CircleLoaderSpinner loading={loadingPostsUnderReview} />
              ) : (
                postsUnderReviewItems
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <h2
              style={{
                textAlign: 'center',
              }}
            >
              Published Posts
            </h2>

            <div>
              {loadingPublishedPosts ? (
                <CircleLoaderSpinner loading={loadingPublishedPosts} />
              ) : (
                publishedPostsItems
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <h2
              style={{
                textAlign: 'center',
              }}
            >
              What else?
            </h2>

            <div>...</div>
          </div>
        </div>
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
