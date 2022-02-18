import React from 'react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { MainContainer, PageComponent } from '../../components/layouts';
import { db, collection, onSnapshot, query, where } from '../../firebase/db';
import { IPost, IPostStatus } from '../../interfaces';
import { PostsGridStyled } from '../../styles/pages/posts/Posts';
import PostsSection from '../../components/posts/PostsSection';

export function Posts() {
  const AuthUser = useAuthUser();
  const uid = AuthUser.id;

  const [approvedPosts, setApprovedPosts] = React.useState<IPost[]>([]);
  const [loadingApprovedPosts, setLoadingApprovedPosts] = React.useState(false);
  const [postsPendingApproval, setPostsPendingApproval] = React.useState<
    IPost[]
  >([]);
  const [loadingPostsPendingApproval, setLoadingPostsPendingApproval] =
    React.useState(false);
  const [rejectedPosts, setRejectedPosts] = React.useState<IPost[]>([]);
  const [loadingRejectedPosts, setLoadingRejectedPosts] = React.useState(false);

  React.useEffect(() => {
    setLoadingApprovedPosts(true);
    setLoadingPostsPendingApproval(true);
    setLoadingRejectedPosts(true);

    const approvedPostsQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.APPROVED),
      where('authorId', '==', uid)
    );

    const unsubApprovedPosts = onSnapshot(
      approvedPostsQuery,
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;

          posts.push(post);
        });
        setLoadingApprovedPosts(false);
        setApprovedPosts([...posts]);
      }
    );

    const postsPendingApprovalQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.PENDING_APPROVAL),
      where('authorId', '==', uid)
    );

    const unsubPostsPendingApproval = onSnapshot(
      postsPendingApprovalQuery,
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          posts.push(post);
        });
        setLoadingPostsPendingApproval(false);
        setPostsPendingApproval([...posts]);
      }
    );

    const rejectedPostsQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.REJECTED),
      where('authorId', '==', uid)
    );

    const unsubRejectedPosts = onSnapshot(
      rejectedPostsQuery,
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          posts.push(post);
        });
        setLoadingRejectedPosts(false);
        setRejectedPosts([...posts]);
      }
    );

    return () => {
      unsubApprovedPosts();
      unsubPostsPendingApproval();
      unsubRejectedPosts();
    };
  }, []);

  return (
    <MainContainer title="My Posts">
      <PageComponent title="My Posts">
        <PostsGridStyled>
          <PostsSection
            posts={approvedPosts}
            title={IPostStatus.APPROVED}
            loading={loadingApprovedPosts}
          />

          <PostsSection
            posts={postsPendingApproval}
            title={IPostStatus.PENDING_APPROVAL}
            loading={loadingPostsPendingApproval}
            preview={true}
          />

          <PostsSection
            posts={rejectedPosts}
            title={IPostStatus.REJECTED}
            loading={loadingRejectedPosts}
            preview={true}
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
