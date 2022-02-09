import React from 'react';
import {
  UserMenuContainerStyled,
  AuthContainerStyled,
} from '../../styles/components/header/AuthContainer';
import SignButton from '../buttons/SignButton';
import { useAuthUser } from 'next-firebase-auth';
import UserMenu from './UserMenu';

interface Props {
  open: boolean;
  toggle: () => void;
}

export default function AuthContainer({ open, toggle }: Props) {
  const AuthUser = useAuthUser();
  const user = AuthUser.id ? AuthUser : null;

  return (
    <AuthContainerStyled>
      {user ? (
        <UserMenuContainerStyled>
          <span onClick={toggle}>Hello, {user.displayName}</span>
          {open && <UserMenu user={user} />}
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
