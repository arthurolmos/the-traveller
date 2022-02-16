import React from 'react';
import Link from 'next/link';
import { AdminMenuStyled } from '../../styles/components/header/AdminMenu';
import { AuthUser } from 'next-firebase-auth';
import { FaPen, FaUser, FaDoorOpen, FaSign, FaLock } from 'react-icons/fa';

interface Props {
  user: AuthUser;
}

export default function AdminMenu({ user }: Props) {
  return (
    <AdminMenuStyled>
      <ul>
        <Link href="/admin" passHref>
          <li>
            <FaLock /> Admin Panel
          </li>
        </Link>

        <Link href="/posts/new-post" passHref>
          <li>
            <FaPen /> Write a Post!
          </li>
        </Link>
        <Link href="/posts" passHref>
          <li>
            <FaSign /> My Posts
          </li>
        </Link>
        <Link href="/user" passHref>
          <li>
            <FaUser /> User Profile
          </li>
        </Link>
        <li onClick={() => user.signOut()}>
          <FaDoorOpen /> Sign Out
        </li>
      </ul>
    </AdminMenuStyled>
  );
}
