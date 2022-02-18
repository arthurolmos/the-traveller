import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { db, getDoc, doc } from '../../../firebase/db';
import { Post as PreviewPost } from '../[pid]';
import { IPost } from '../../../interfaces';
import convertTimestampToDate from '../../../lib/covertTimestampToDate';

interface Props {
  post: IPost;
}

async function getPost(pid: string) {
  const docRef = doc(db, 'posts', pid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    post.id = docSnap.id;

    post.createdAt = convertTimestampToDate(post.createdAt);
    post.updatedAt = convertTimestampToDate(post.updatedAt);

    return post;
  } else {
    return null;
  }
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
})(async ({ AuthUser, params }) => {
  try {
    const { pid } = params;

    const post = await getPost(pid as string);

    if (!post) throw new Error();

    if (AuthUser.id !== post.author.id) {
      const isAdmin = await isUserAdmin(AuthUser.id);
      if (!isAdmin) {
        throw new Error();
      }
    }

    return {
      props: {
        post,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
});

export default withAuthUser<Props>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(PreviewPost);
