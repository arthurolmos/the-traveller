import Link from 'next/link';
import React from 'react';
import { IMenuOption } from '../../interfaces/IMenuOption';

interface ItemMenuProps {
  item: IMenuOption;
  route: string;
}

export default function MenuItem({ item, route }: ItemMenuProps) {
  const active = route === item.link;

  return (
    <Link href={item.link} passHref>
      <li className={active ? 'active' : ''}>{item.title}</li>
    </Link>
  );
}
