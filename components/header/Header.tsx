import Link from "next/link";
import React from "react";
import {
  HeaderStyled,
  HeaderLogoStyled,
  HeaderMenuStyled,
  HeaderSignButtonsContainerStyled,
  SignButtonStyled,
  HeaderMenuButtonStyled,
  HeaderMenuButtonContainerStyled,
  HeaderCollapsableMenuStyled,
  HeaderCollapsableMenuListContainerStyled,
  HeaderCollapsableMenuSignContainerStyled,
} from "../../styles/components/header/Header";
import { FaBars } from "react-icons/fa";

interface MenuOption {
  title: string;
  link: string;
}

const menuOptions: MenuOption[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Locations ",
    link: "/locations",
  },
  {
    title: "Guides",
    link: "/guides",
  },
  {
    title: "Network ",
    link: "/network",
  },
  {
    title: "About Us ",
    link: "/about-us",
  },
];

function HeaderMenuItem({ item }: { item: MenuOption }) {
  return (
    <Link href={item.link} passHref>
      <li>{item.title}</li>
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
  const [offset, setOffset] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen(!open);

  const onScroll = () => {
    const offset = window.scrollY;

    setOffset(offset);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <HeaderStyled offset={offset}>
      <HeaderLogoStyled src="assets/logo.png" />
      <HeaderMenuStyled>
        {menuOptions.map((item) => {
          return <HeaderMenuItem item={item} key={item.title} />;
        })}
      </HeaderMenuStyled>

      <HeaderSignButtonsContainerStyled>
        <SignButtonStyled>Sign in</SignButtonStyled>
        <SignButtonStyled inverted>Sign up</SignButtonStyled>
      </HeaderSignButtonsContainerStyled>

      <HeaderMenuButtonContainerStyled>
        <HeaderMenuButton onClick={toggle} open={open} />
      </HeaderMenuButtonContainerStyled>
      {open && (
        <HeaderCollapsableMenuStyled>
          <HeaderCollapsableMenuListContainerStyled>
            {menuOptions.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })}
          </HeaderCollapsableMenuListContainerStyled>
          <HeaderCollapsableMenuSignContainerStyled>
            <SignButtonStyled>Sign in</SignButtonStyled>
            <SignButtonStyled inverted>Sign up</SignButtonStyled>
          </HeaderCollapsableMenuSignContainerStyled>
        </HeaderCollapsableMenuStyled>
      )}
    </HeaderStyled>
  );
}
