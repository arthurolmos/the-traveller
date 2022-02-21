import React from 'react';
import { HomeSectionStyled } from '../../styles/components/home/HomeSection';

interface Props {
  title;
  children: React.ReactNode;
}

export default function HomeSection({ title, children }: Props) {
  return (
    <HomeSectionStyled>
      <h1>{title}</h1>
      {children}
    </HomeSectionStyled>
  );
}
