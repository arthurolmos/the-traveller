import React from 'react';
import Link from 'next/link';
import { UserMenuStyled } from '../../styles/components/header/UserMenu';
import { AuthUser } from 'next-firebase-auth';
import { FaPen, FaUser, FaDoorOpen, FaSign } from 'react-icons/fa';
import { IMenuOption } from '../../models/IMenuOption';

interface Props {
  user: AuthUser;
}

const menuOptions: IMenuOption[] = [
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
    title: 'My Profile',
    link: '/profile',
    icon: <FaUser />,
  },
];

export default function UserMenu({ user }: Props) {
  return (
    <UserMenuStyled>
      <ul>
        {menuOptions.map((item) => {
          return (
            <Link href={item.link} passHref key={item.title}>
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
    </UserMenuStyled>
  );
}
