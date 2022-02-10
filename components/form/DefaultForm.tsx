import React from 'react';
import { DefaultFormStyled } from '../../styles/pages/SignIn';

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}

export default function DefaultForm({ children }: Props) {
  return <DefaultFormStyled>{children}</DefaultFormStyled>;
}
