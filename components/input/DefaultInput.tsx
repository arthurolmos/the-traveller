import React from 'react';
import { DefaultInputStyled } from '../../styles/components/input/DefaultInput';

export default function DefaultInput({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <DefaultInputStyled {...rest} />;
}
