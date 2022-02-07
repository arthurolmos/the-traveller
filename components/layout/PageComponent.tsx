import React from "react";
import { PageComponentStyled } from "../../styles/components/layout/PageComponent";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function PageComponent({ title, children }: Props) {
  return (
    <PageComponentStyled>
      <h1>{title}</h1>

      <div>{children}</div>
    </PageComponentStyled>
  );
}
