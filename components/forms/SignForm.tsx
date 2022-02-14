import React from 'react';
import { SignFormStyled } from '../../styles/components/forms/SignForm';

export default function SignForm({
  children,
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <SignFormStyled>{children}</SignFormStyled>;
}
