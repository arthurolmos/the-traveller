import React from 'react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import MainContainer from '../../components/layouts/MainContainer';
import PageComponent from '../../components/layouts/PageComponent';
import {
  db,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from '../../firebase/db';
import { IPost, IPostStatus } from '../../interfaces';
import { PostsGridStyled } from '../../styles/pages/posts/Posts';
import PostsSection from '../../components/admin/PostsSection';

export function AdminPanel() {
  const AuthUser = useAuthUser();

  const [postsPendingApproval, setPostsPendingApproval] = React.useState<
    IPost[]
  >([]);
  const [loadingPostsPendingApproval, setLoadingPostsPendingApproval] =
    React.useState(false);

  React.useEffect(() => {
    setLoadingPostsPendingApproval(true);

    const postsPendingApprovalQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.PENDING_APPROVAL),
      orderBy('createdAt')
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

    return () => {
      unsubPostsPendingApproval();
    };
  }, []);

  return (
    <MainContainer title="Admin Panel">
      <PageComponent title="Admin Panel">
        <PostsGridStyled>
          <PostsSection
            posts={postsPendingApproval}
            title={IPostStatus.PENDING_APPROVAL}
            loading={loadingPostsPendingApproval}
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
})(AdminPanel);
