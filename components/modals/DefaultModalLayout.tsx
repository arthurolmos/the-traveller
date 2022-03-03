import React from 'react';
import { FaTimes } from 'react-icons/fa';
import {
  DefaultModalLayoutStyled,
  ModalContainerStyled,
} from '../../styles/components/modals/DefaultModalLayout';

interface Props {
  open: boolean;
  close: () => void;
  title: string;
  children: React.ReactNode;
}

export default function DefaultModalLayout({
  open,
  close,
  title,
  children,
}: Props) {
  return (
    <DefaultModalLayoutStyled open={open}>
      <ModalContainerStyled>
        <FaTimes onClick={close} />
        <h1>{title}</h1>
        {children}
      </ModalContainerStyled>
    </DefaultModalLayoutStyled>
  );
}
