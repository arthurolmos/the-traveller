import React from 'react';
import Link from 'next/link';
import { AdminMenuStyled } from '../../styles/components/header/AdminMenu';
import { AuthUser } from 'next-firebase-auth';
import { FaPen, FaUser, FaDoorOpen, FaSign, FaLock } from 'react-icons/fa';
import { IMenuOption } from '../../interfaces/IMenuOption';

interface Props {
  user: AuthUser;
}

const menuOptions: IMenuOption[] = [
  {
    title: 'Admin Panel',
    link: '/admin',
    icon: <FaLock />,
  },
  {
    title: 'Write a Post!',
    link: '/posts/new-post',
    icon: <FaPen />,
  },
  {
    title: 'My Posts',
    link: '/posts',
    icon: <FaSign />,
  },
  {
    title: 'User Profile',
    link: '/profile',
    icon: <FaUser />,
  },
];

export default function AdminMenu({ user }: Props) {
  return (
    <AdminMenuStyled>
      <ul>
        {menuOptions.map((item) => {
          return (
            <Link href={item.link} passHref>
              <li>
                {item.icon} {item.title}
              </li>
            </Link>
          );
        })}

        <li onClick={() => user.signOut()}>
          <FaDoorOpen /> Sign Out
        </li>
      </ul>
    </AdminMenuStyled>
  );
}
