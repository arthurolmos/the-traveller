import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import {
  HeaderStyled,
  LogoStyled,
  MenuStyled,
  PanelContainerStyled,
  HamburgerButtonStyled,
  CollapsableMenuStyled,
  UserMenuContainerStyled,
  AuthContainerStyled,
  CollapsableMenuListContainerStyled,
  CollapsablePanelContainerStyled,
} from '../../styles/components/header';
import { FaBars } from 'react-icons/fa';
import SignButton from '../buttons/SignButton';
import { AuthUser, useAuthUser } from 'next-firebase-auth';
import UserMenu from './UserMenu';

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

function HamburgerButton({
  onClick,
  open,
}: {
  onClick: () => void;
  open: boolean;
}) {
  return (
    <HamburgerButtonStyled onClick={onClick} open={open}>
      <FaBars size={32} />
    </HamburgerButtonStyled>
  );
}

export default function Header() {
  const { route } = useRouter();

  const AuthUser = useAuthUser();
  const user = AuthUser.id ? AuthUser : null;

  const [userMenu, setUserMenu] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleUserMenu = () => setUserMenu(!userMenu);
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
      <LogoStyled src="assets/logo.png" />
      <MenuStyled>
        {menuOptions.map((item) => {
          return <HeaderMenuItem item={item} key={item.title} route={route} />;
        })}
      </MenuStyled>

      <PanelContainerStyled>
        <AuthContainerStyled>
          {user ? (
            <UserMenuContainerStyled>
              <span onClick={toggleUserMenu}>Hello, {user.displayName}</span>
              {userMenu && <UserMenu user={user} />}
            </UserMenuContainerStyled>
          ) : (
            <>
              <SignButton title="Sign in" href="/signin" />
              <SignButton title="Sign up" href="/signup" inverted />
            </>
          )}
        </AuthContainerStyled>

        <HamburgerButton onClick={toggle} open={open} />
      </PanelContainerStyled>

      <CollapsableMenuStyled open={open} collapsed={collapsed}>
        <CollapsableMenuListContainerStyled>
          {menuOptions.map((item, index) => {
            return <HeaderMenuItem item={item} key={index} route={route} />;
          })}
        </CollapsableMenuListContainerStyled>
        <CollapsablePanelContainerStyled>
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>Hello, {user.displayName}</div>
              <UserMenu user={user} />
            </div>
          ) : (
            <>
              <SignButton title="Sign in" href="/signin" />
              <SignButton title="Sign up" href="/signup" inverted />
            </>
          )}
        </CollapsablePanelContainerStyled>
      </CollapsableMenuStyled>
    </HeaderStyled>
  );
}
