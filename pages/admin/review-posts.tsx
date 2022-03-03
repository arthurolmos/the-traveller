import React from 'react';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
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
import { AdminPageLayout } from '../../components/admin/AdminPageLayout';

export function AdminReviewPosts() {
  const [loading, setLoading] = React.useState(false);
  const [postsPendingApproval, setPostsPendingApproval] = React.useState<
    IPost[]
  >([]);

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
    <AdminPageLayout title="Review Posts">
      <div>Posts</div>
    </AdminPageLayout>
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
})(AdminReviewPosts);
