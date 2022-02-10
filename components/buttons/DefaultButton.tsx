import React from 'react';
import { DefaultButtonStyled } from '../../styles/components/buttons';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  inverted?: boolean;
  onClick: (e: React.FormEvent) => void;
}

export default function DefaultButton(props: Props) {
  const { title, inverted = false, onClick } = props;

  return (
    <DefaultButtonStyled inverted={inverted} onClick={onClick}>
      {title}
    </DefaultButtonStyled>
  );
}
