import React from 'react';
import { useRouter } from 'next/router';
import {
  HeaderStyled,
  LogoStyled,
  MenuStyled,
  PanelContainerStyled,
  HamburgerButtonStyled,
} from '../../styles/components/header/Header';
import { FaBars } from 'react-icons/fa';
import CollapsableMenu from './CollapsableMenu';
import AuthContainer from './AuthContainer';
import { menuOptions } from './menuOptions';
import MenuItem from './MenuItem';

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
      <LogoStyled src="assets/logo.png" />
      <MenuStyled>
        {menuOptions.map((item) => {
          return <MenuItem item={item} key={item.title} route={route} />;
        })}
      </MenuStyled>

      <PanelContainerStyled>
        <AuthContainer toggle={toggle} open={open} />

        <HamburgerButton onClick={toggle} open={open} />
      </PanelContainerStyled>

      <CollapsableMenu open={open} collapsed={collapsed} />
    </HeaderStyled>
  );
}
