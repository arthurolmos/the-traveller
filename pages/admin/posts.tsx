import React from 'react';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { MainContainer, PageComponent } from '../../components/layouts';
import {
  db,
  getDoc,
  doc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from '../../firebase/db';
import { IPost, IPostStatus } from '../../interfaces';
import {
  PostContainerStyled,
  PostTabContainerStyled,
  TabItemStyled,
  TabRowStyled,
} from '../../styles/pages/admin/AdminPanel';
import { ClipLoaderSpinner } from '../../components/spinners/ClipLoader';
import PostListItem from '../../components/admin/PostListItem';

export function AdminPanel() {
  const [selectedTab, setSelectedTab] = React.useState(
    IPostStatus.PENDING_APPROVAL
  );
  const [loading, setLoading] = React.useState({
    [IPostStatus.APPROVED]: false,
    [IPostStatus.REJECTED]: false,
    [IPostStatus.PENDING_APPROVAL]: false,
  });
  const [postsPendingApproval, setPostsPendingApproval] = React.useState<
    IPost[]
  >([]);

  React.useEffect(() => {
    const loading = {
      [IPostStatus.REJECTED]: false,
      [IPostStatus.APPROVED]: false,
      [IPostStatus.PENDING_APPROVAL]: true,
    };

    setLoading(loading);

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

        setLoading((prevState) => {
          return {
            ...prevState,
            [IPostStatus.PENDING_APPROVAL]: false,
          };
        });
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
        <PostTabContainerStyled>
          <TabRowStyled>
            <TabItemStyled selected={true}>
              {IPostStatus.PENDING_APPROVAL}
            </TabItemStyled>
          </TabRowStyled>

          <PostContainerStyled>
            {<ClipLoaderSpinner loading={loading[selectedTab]} />}
            {postsPendingApproval.length === 0 && !loading[selectedTab] && (
              <span>No posts to show</span>
            )}
            {postsPendingApproval.map((item, index) => {
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

async function isUserAdmin(uid: string) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data();

    return user.isAdmin;
  } else {
    return false;
  }
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const isAdmin = await isUserAdmin(AuthUser.id);

  if (!isAdmin) {
    return {
      notFound: true,
    };
  }
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AdminPanel);
