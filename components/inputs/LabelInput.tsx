import React from 'react';
import {
  LabelInputWrapperStyled,
  InputInfoStyled,
  InputLabelStyled,
} from '../../styles/components/inputs/LabelInput';
import { DefaultInput } from './DefaultInput';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  info?: string;
}

export const LabelInput = React.forwardRef(
  (props: Props, ref?: React.Ref<HTMLInputElement>) => {
    const { label, info, ...rest } = props;

    return (
      <LabelInputWrapperStyled>
        {label && <InputLabelStyled>{label}</InputLabelStyled>}
        <DefaultInput ref={ref} {...rest} />
        {info && <InputInfoStyled>{info}</InputInfoStyled>}
      </LabelInputWrapperStyled>
    );
  }
);
