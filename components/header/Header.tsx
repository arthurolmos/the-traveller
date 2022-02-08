import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import {
  HeaderStyled,
  HeaderLogoStyled,
  HeaderMenuStyled,
  HeaderSignButtonsContainerStyled,
  HeaderMenuButtonStyled,
  HeaderMenuButtonContainerStyled,
  HeaderCollapsableMenuStyled,
  HeaderCollapsableMenuListContainerStyled,
  HeaderCollapsableMenuSignContainerStyled,
} from '../../styles/components/header/Header';
import { FaBars } from 'react-icons/fa';
import SignButton from '../buttons/SignButton';
import { useAuthUser } from 'next-firebase-auth';

interface MenuOption {
  title: string;
  link: string;
}

interface ItemMenuProps {
  item: MenuOption;
  route: string;
}

const menuOptions: MenuOption[] = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Locations ',
    link: '/locations',
  },
  {
    title: 'Guides',
    link: '/guides',
  },
  {
    title: 'Network ',
    link: '/network',
  },
  {
    title: 'About Us ',
    link: '/about-us',
  },
];

function HeaderMenuItem({ item, route }: ItemMenuProps) {
  const active = route === item.link;

  return (
    <Link href={item.link} passHref>
      <li className={active ? 'active' : ''}>{item.title}</li>
    </Link>
  );
}

function HeaderMenuButton({
  onClick,
  open,
}: {
  onClick: () => void;
  open: boolean;
}) {
  return (
    <HeaderMenuButtonStyled onClick={onClick} open={open}>
      <FaBars size={32} />
    </HeaderMenuButtonStyled>
  );
}

export default function Header() {
  const { route } = useRouter();

  const AuthUser = useAuthUser();
  const user = AuthUser.id ? AuthUser : null;

  const [open, setOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => setOpen(!open);

  const onScroll = () => {
    const offset = window.scrollY;

    setCollapsed(offset >= 200);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <HeaderStyled collapsed={collapsed}>
      <HeaderLogoStyled src="assets/logo.png" />
      <HeaderMenuStyled>
        {menuOptions.map((item) => {
          return <HeaderMenuItem item={item} key={item.title} route={route} />;
        })}
      </HeaderMenuStyled>

      <HeaderSignButtonsContainerStyled>
        {user ? (
          // <Link href={`/users/${user.id}`} passHref>
          <div onClick={() => user.signOut()}>Hello, {user.displayName}</div>
        ) : (
          // </Link>
          <>
            <SignButton title="Sign in" href="/signin" />
            <SignButton title="Sign up" href="/signup" inverted />
          </>
        )}
      </HeaderSignButtonsContainerStyled>

      <HeaderMenuButtonContainerStyled>
        <HeaderMenuButton onClick={toggle} open={open} />
      </HeaderMenuButtonContainerStyled>

      <HeaderCollapsableMenuStyled open={open} collapsed={collapsed}>
        <HeaderCollapsableMenuListContainerStyled>
          {menuOptions.map((item, index) => {
            return <HeaderMenuItem item={item} key={index} route={route} />;
          })}
        </HeaderCollapsableMenuListContainerStyled>
        <HeaderCollapsableMenuSignContainerStyled>
          {user ? (
            <div onClick={() => user.signOut()}>Hello, {user.displayName}</div>
          ) : (
            <>
              <SignButton title="Sign in" href="/signin" />
              <SignButton title="Sign up" href="/signup" inverted />
            </>
          )}
        </HeaderCollapsableMenuSignContainerStyled>
      </HeaderCollapsableMenuStyled>
    </HeaderStyled>
  );
}
