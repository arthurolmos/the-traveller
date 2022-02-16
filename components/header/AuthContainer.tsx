import React from 'react';
import {
  UserMenuContainerStyled,
  AuthContainerStyled,
} from '../../styles/components/header/AuthContainer';
import SignButton from '../buttons/SignButton';
import { useAuthUser } from 'next-firebase-auth';
import UserMenu from './UserMenu';
import AdminMenu from './AdminMenu';
import { db, getDoc, doc } from '../../firebase/db';

interface Props {
  open: boolean;
  toggle: () => void;
}

export default function AuthContainer({ open, toggle }: Props) {
  const AuthUser = useAuthUser();
  const user = AuthUser.id ? AuthUser : null;

  React.useEffect(() => {
    async function isAdmin() {
      const docRef = doc(db, 'users', user.id);
      const resp = await getDoc(docRef);

      console.log({ resp });
    }

    if (user) isAdmin();
  }, [user]);

  // const menu = React.useMemo(() => {
  //   return user.isAdmin ?
  // }, ]user)

  return (
    <AuthContainerStyled>
      {user ? (
        <UserMenuContainerStyled>
          <span onClick={toggle}>Hello, {user.displayName}</span>
          {open && <AdminMenu user={user} />}
          {/* {open && <UserMenu user={user} />} */}
        </UserMenuContainerStyled>
      ) : (
        <>
          <SignButton title="Sign in" href="/signin" />
          <SignButton title="Sign up" href="/signup" inverted />
        </>
      )}
    </AuthContainerStyled>
  );
}
