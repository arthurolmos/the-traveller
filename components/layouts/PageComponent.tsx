import React from 'react';
import { PageComponentStyled } from '../../styles/components/layouts/PageComponent';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function PageComponent({ title, children }: Props) {
  return (
    <PageComponentStyled>
      <h1>{title}</h1>

      {children}
    </PageComponentStyled>
  );
}
