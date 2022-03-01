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
import { headerOptions } from './headerOptions';
import MenuItem from './MenuItem';
import Link from 'next/link';

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

  const toggle = () => setOpen(!open);

  return (
    <HeaderStyled>
      <Link href="/" passHref>
        <LogoStyled src="/assets/logo.png" />
      </Link>
      <MenuStyled>
        {headerOptions.map((item) => {
          return <MenuItem item={item} key={item.title} route={route} />;
        })}
      </MenuStyled>

      <PanelContainerStyled>
        <AuthContainer toggle={toggle} open={open} />

        <HamburgerButton onClick={toggle} open={open} />
      </PanelContainerStyled>

      <CollapsableMenu open={open} />
    </HeaderStyled>
  );
}
