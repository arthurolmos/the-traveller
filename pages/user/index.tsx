import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import React from 'react';
import MainContainer from '../../components/layout/MainContainer';
import PageComponent from '../../components/layout/PageComponent';

export function User() {
  const AuthUser = useAuthUser();

  console.log('user', { AuthUser });

  return (
    <MainContainer title={AuthUser.displayName}>
      <PageComponent title="User Details">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>{AuthUser.displayName}</div>
            <div>{AuthUser.email}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>{AuthUser.displayName}</div>
            <div>{AuthUser.email}</div>
          </div>
        </div>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser()(User);
