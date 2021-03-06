import React from 'react';
import { DefaultInputStyled } from '../../styles/components/inputs/DefaultInput';

export const DefaultInput = React.forwardRef(
  (
    props: React.InputHTMLAttributes<HTMLInputElement>,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    const { ...rest } = props;

    return <DefaultInputStyled ref={ref} {...rest} />;
  }
);
