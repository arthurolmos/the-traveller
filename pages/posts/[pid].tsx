import React from 'react';
import { useRouter } from 'next/router';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

export function Post() {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Post: {pid}</p>;
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Post);
