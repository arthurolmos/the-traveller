import Link from 'next/link';
import React from 'react';
import { IHeaderOption } from '../../models/IHeaderOption';

interface Props {
  item: IHeaderOption;
  route: string;
}

export default function MenuItem({ item, route }: Props) {
  const active = route === item.link;

  return (
    <Link href={item.link} passHref>
      <li className={active ? 'active' : ''}>{item.title}</li>
    </Link>
  );
}
