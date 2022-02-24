import React from 'react';
import { AboutUsSectionStyled } from '../../styles/components/about-us/AboutUsSection';

interface Props {
  children: React.ReactNode;
}

export function AboutUsSection({ children }: Props) {
  return <AboutUsSectionStyled>{children}</AboutUsSectionStyled>;
}
