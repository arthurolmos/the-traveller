import React from 'react';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { db, getDoc, doc } from '../../../firebase/db';
import { Post as PreviewPost } from '../[pid]';
import { IPost } from '../../../interfaces';
import { Timestamp } from 'firebase/firestore';

interface Props {
  post: IPost;
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, params }) => {
  const { pid } = params;

  const docRef = doc(db, 'posts', pid as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    post.id = docSnap.id;

    post.createdAt = post.createdAt as Timestamp;
    post.createdAt = post.createdAt.toDate().toString();

    post.updatedAt = post.updatedAt as Timestamp;
    post.updatedAt = post.updatedAt.toDate().toString();

    if (AuthUser.id !== post.authorId) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
});

export default withAuthUser<Props>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(PreviewPost);
