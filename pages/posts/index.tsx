import React from 'react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { MainContainer, PageComponent } from '../../components/layouts';
import { db, collection, onSnapshot, query, where } from '../../firebase/db';
import { IPost, IPostStatus } from '../../models';
import {
  PostContainerStyled,
  PostTabContainerStyled,
  TabItemStyled,
  TabRowStyled,
} from '../../styles/pages/posts/Posts';
import PostListItem from '../../components/posts/PostListItem';
import { ClipLoaderSpinner } from '../../components/spinners/ClipLoader';

const tabs = Object.values(IPostStatus);

export function Posts() {
  const AuthUser = useAuthUser();
  const uid = AuthUser.id;

  const [selectedTab, setSelectedTab] = React.useState(
    IPostStatus.PENDING_APPROVAL
  );
  const [loading, setLoading] = React.useState({
    [IPostStatus.APPROVED]: false,
    [IPostStatus.REJECTED]: false,
    [IPostStatus.PENDING_APPROVAL]: false,
  });
  const [approvedPosts, setApprovedPosts] = React.useState<IPost[]>([]);
  const [postsPendingApproval, setPostsPendingApproval] = React.useState<
    IPost[]
  >([]);
  const [rejectedPosts, setRejectedPosts] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    const loading = {
      [IPostStatus.REJECTED]: true,
      [IPostStatus.APPROVED]: true,
      [IPostStatus.PENDING_APPROVAL]: true,
    };

    setLoading(loading);

    const approvedPostsQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.APPROVED),
      where('author.id', '==', uid)
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

        setLoading((prevState) => {
          return {
            ...prevState,
            [IPostStatus.APPROVED]: false,
          };
        });
        setApprovedPosts([...posts]);
      }
    );

    const postsPendingApprovalQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.PENDING_APPROVAL),
      where('author.id', '==', uid)
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

        setLoading((prevState) => {
          return {
            ...prevState,
            [IPostStatus.PENDING_APPROVAL]: false,
          };
        });
        setPostsPendingApproval([...posts]);
      }
    );

    const rejectedPostsQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.REJECTED),
      where('author.id', '==', uid)
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

        setLoading((prevState) => {
          return {
            ...prevState,
            [IPostStatus.REJECTED]: false,
          };
        });
        setRejectedPosts([...posts]);
      }
    );

    return () => {
      unsubApprovedPosts();
      unsubPostsPendingApproval();
      unsubRejectedPosts();
    };
  }, []);

  const posts =
    selectedTab === IPostStatus.APPROVED
      ? approvedPosts
      : selectedTab === IPostStatus.REJECTED
      ? rejectedPosts
      : postsPendingApproval;

  return (
    <MainContainer title="My Posts">
      <PageComponent title="My Posts">
        <PostTabContainerStyled>
          <TabRowStyled>
            {tabs.map((item) => {
              return (
                <TabItemStyled
                  key={item}
                  selected={selectedTab === item}
                  onClick={() => setSelectedTab(item)}
                >
                  {item}
                </TabItemStyled>
              );
            })}
          </TabRowStyled>

          <PostContainerStyled>
            {<ClipLoaderSpinner loading={loading[selectedTab]} />}
            {posts.length === 0 && !loading[selectedTab] && (
              <span>No posts to show</span>
            )}
            {posts.map((item, index) => {
              return (
                <PostListItem
                  key={item.id}
                  item={item}
                  index={index}
                  preview={selectedTab !== IPostStatus.APPROVED}
                />
              );
            })}
          </PostContainerStyled>
        </PostTabContainerStyled>
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
