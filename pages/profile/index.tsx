import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Image from 'next/image';
import React from 'react';
import {
  db,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from '../../firebase/db';
import { MainContainer, PageComponent } from '../../components/layouts';
import {
  ImageContainerStyled,
  ProfileHeaderStyled,
} from '../../styles/pages/profile';
import placeholder from '../../public/assets/users/placeholder.svg';

export function Profile() {
  const AuthUser = useAuthUser();

  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <MainContainer title={AuthUser.displayName}>
      <PageComponent title="My Profile">
        <ProfileHeaderStyled>
          <ImageContainerStyled
            onClick={() => ref.current.click()}
            style={{ cursor: 'pointer' }}
          >
            <input type="file" style={{ visibility: 'hidden' }} ref={ref} />
            <Image
              src={AuthUser.photoURL ? AuthUser.photoURL : placeholder}
              alt="Profile Picture"
              layout="fill"
            />
          </ImageContainerStyled>
          <a>{AuthUser.email}</a>
        </ProfileHeaderStyled>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser()(Profile);
