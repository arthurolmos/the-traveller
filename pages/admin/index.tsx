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
import { IPost, IPostStatus } from '../../models';
import {
  PostContainerStyled,
  PostTabContainerStyled,
  TabItemStyled,
  TabRowStyled,
} from '../../styles/pages/admin/AdminPanel';
import { ClipLoaderSpinner } from '../../components/spinners/ClipLoader';
import PostListItem from '../../components/admin/PostListItem';

const tabs = Object.values(IPostStatus);

export function AdminPanel() {
  const [selectedTab, setSelectedTab] = React.useState(
    IPostStatus.PENDING_APPROVAL
  );
  const [loading, setLoading] = React.useState(false);
  const [postsPendingApproval, setPostsPendingApproval] =
    React.useState<number>(0);

  React.useEffect(() => {
    setLoading(true);

    const postsPendingApprovalQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.PENDING_APPROVAL),
      orderBy('createdAt')
    );

    const unsubPostsPendingApproval = onSnapshot(
      postsPendingApprovalQuery,
      (querySnapshot) => {
        setLoading(false);
        setPostsPendingApproval(querySnapshot.size);
      }
    );

    return () => {
      unsubPostsPendingApproval();
    };
  }, []);

  return (
    <MainContainer title="Admin Panel">
      <PageComponent title="Admin Panel">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          <div style={{ display: 'flex', flex: 1 }}>Write Guide</div>
          <div style={{ display: 'flex', flex: 1 }}>
            Review Community's Posts{' '}
            {loading ? (
              <ClipLoaderSpinner loading={loading} size={16} />
            ) : (
              postsPendingApproval
            )}
          </div>
        </div>
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
