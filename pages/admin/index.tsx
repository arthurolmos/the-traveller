import React from 'react';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { db } from '../../firebase/db';
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { AdminPageLayout } from '../../components/admin/AdminPageLayout';
import { ClipLoaderSpinner } from '../../components/spinners';

export function AdminHome() {
  const [loading, setLoading] = React.useState({
    users: false,
    posts: false,
    postsThisMonth: false,
  });
  const [users, setUsers] = React.useState(0);
  const [posts, setPosts] = React.useState(0);
  const [postsThisMonth, setPostsThisMonth] = React.useState(0);

  React.useEffect(() => {
    async function getUsers() {
      try {
        setLoading((prevState) => {
          return {
            users: true,
            posts: prevState.posts,
            postsThisMonth: prevState.postsThisMonth,
          };
        });

        const q = query(collection(db, 'users'));

        const documentSnapshots = await getDocs(q);

        setUsers(documentSnapshots.size);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prevState) => {
          return {
            users: false,
            posts: prevState.posts,
            postsThisMonth: prevState.postsThisMonth,
          };
        });
      }
    }

    async function getPosts() {
      try {
        setLoading((prevState) => {
          return {
            users: prevState.users,
            posts: true,
            postsThisMonth: prevState.postsThisMonth,
          };
        });

        const q = query(collection(db, 'posts'));

        const documentSnapshots = await getDocs(q);

        setPosts(documentSnapshots.size);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prevState) => {
          return {
            users: prevState.users,
            posts: false,
            postsThisMonth: prevState.postsThisMonth,
          };
        });
      }
    }

    async function getPostsThisMonth() {
      try {
        setLoading((prevState) => {
          return {
            users: prevState.users,
            posts: prevState.posts,
            postsThisMonth: true,
          };
        });

        const date = new Date();

        const month = date.getMonth();
        const year = date.getFullYear();

        const firstDay = new Date(`${year}/${month + 1}/01`);
        const currentDay = date;

        const q = query(
          collection(db, 'posts'),
          where('createdAt', '>=', firstDay),
          where('createdAt', '<=', currentDay)
        );

        const documentSnapshots = await getDocs(q);

        setPostsThisMonth(documentSnapshots.size);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prevState) => {
          return {
            users: prevState.users,
            posts: prevState.posts,
            postsThisMonth: false,
          };
        });
      }
    }

    getUsers();
    getPosts();
    getPostsThisMonth();
  }, []);

  return (
    <AdminPageLayout title="Home">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div>
          Users Total:{' '}
          {loading.users ? (
            <ClipLoaderSpinner loading={loading.users} size={12} />
          ) : (
            users
          )}
        </div>
        <div>
          Posts this month:{' '}
          {loading.postsThisMonth ? (
            <ClipLoaderSpinner loading={loading.postsThisMonth} size={12} />
          ) : (
            postsThisMonth
          )}
        </div>
        <div>
          Posts Total:{' '}
          {loading.posts ? (
            <ClipLoaderSpinner loading={loading.posts} size={12} />
          ) : (
            posts
          )}
        </div>
      </div>
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
})(AdminHome);
