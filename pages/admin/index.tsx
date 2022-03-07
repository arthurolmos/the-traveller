import React from 'react';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { db } from '../../firebase/db';
import { getDoc, doc } from 'firebase/firestore';
import { AdminPageLayout } from '../../components/admin/AdminPageLayout';

export function AdminPanel() {
  return (
    <AdminPageLayout title="Home">
      <div>Home Page</div>
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
})(AdminPanel);
