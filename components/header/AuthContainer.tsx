import React from 'react';
import {
  UserMenuContainerStyled,
  AuthContainerStyled,
} from '../../styles/components/header/AuthContainer';
import { SignButton } from '../buttons';
import { useAuthUser } from 'next-firebase-auth';
import UserMenu from './UserMenu';
import AdminMenu from './AdminMenu';
import { db } from '../../firebase/db';
import { getDoc, doc } from 'firebase/firestore';

interface Props {
  open: boolean;
  toggle: () => void;
}

export default function AuthContainer({ open, toggle }: Props) {
  const AuthUser = useAuthUser();
  const user = AuthUser.id ? AuthUser : null;

  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    async function isAdmin() {
      const docRef = doc(db, 'users', user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = docSnap.data();

        setIsAdmin(user.isAdmin);
      }
    }

    if (user) isAdmin();
  }, [user]);

  const menu = React.useMemo(() => {
    return isAdmin ? <AdminMenu user={user} /> : <UserMenu user={user} />;
  }, [isAdmin, user]);

  return (
    <AuthContainerStyled>
      {user ? (
        <UserMenuContainerStyled>
          <span onClick={toggle}>Hello, {user.displayName}</span>
          {open && menu}
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
