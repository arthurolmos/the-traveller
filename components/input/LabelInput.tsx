import React from 'react';
import {
  DefaultInputStyled,
  LabelInputWrapperStyled,
  InputInfoStyled,
  InputLabelStyled,
} from '../../styles/components/input/LabelInput';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  info?: string;
}

const LabelInput = React.forwardRef(
  (props: Props, ref?: React.Ref<HTMLInputElement>) => {
    const { label, info, ...rest } = props;

    return (
      <LabelInputWrapperStyled>
        {label && <InputLabelStyled>{label}</InputLabelStyled>}
        <DefaultInputStyled ref={ref} {...rest} />
        {info && <InputInfoStyled>{info}</InputInfoStyled>}
      </LabelInputWrapperStyled>
    );
  }
);

export default LabelInput;
