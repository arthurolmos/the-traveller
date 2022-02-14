import React from 'react';
import { DefaultFormStyled } from '../../styles/components/forms/DefaultForm';

export default function DefaultForm({
  children,
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <DefaultFormStyled>{children}</DefaultFormStyled>;
}
