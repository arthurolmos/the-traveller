import React from 'react';
import { HomeSectionStyled } from '../../styles/components/home/HomeSection';

interface Props {
  title;
  children: React.ReactNode;
}

export default function HomeSection({ title, children }: Props) {
  return (
    <HomeSectionStyled>
      <h1 style={{ fontSize: '2.5em' }}>{title}</h1>
      {children}
    </HomeSectionStyled>
  );
}
