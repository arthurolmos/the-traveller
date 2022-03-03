import Link from 'next/link';
import React from 'react';
import { SignButtonStyled } from '../../styles/components/buttons';

interface Props {
  title: string;
  href: string;
  inverted?: boolean;
}

export function SignButton(props: Props) {
  const { title, href, inverted = false } = props;

  return (
    <Link href={href} passHref>
      <a>
        <SignButtonStyled inverted={inverted}>{title}</SignButtonStyled>
      </a>
    </Link>
  );
}
