import React from 'react';
import Link from 'next/link';
import { UserMenuStyled } from '../../styles/components/header';
import { AuthUser } from 'next-firebase-auth';
import { FaPen, FaUser, FaDoorOpen } from 'react-icons/fa';

interface Props {
  user: AuthUser;
}

export default function UserMenu({ user }: Props) {
  return (
    <UserMenuStyled>
      <ul>
        <li>
          <FaPen /> Write a Review!
        </li>
        <li></li>
        <Link href="/user" passHref>
          <li>
            <FaUser /> User Profile
          </li>
        </Link>
        <li onClick={() => user.signOut()}>
          <FaDoorOpen /> Sign Out
        </li>
      </ul>
    </UserMenuStyled>
  );
}
