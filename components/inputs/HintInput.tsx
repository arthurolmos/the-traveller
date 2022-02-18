import React from 'react';
import {
  HintInputStyled,
  LoaderContainerStyled,
} from '../../styles/components/inputs/HintInput';
import { ClipLoaderSpinner } from '../spinners/ClipLoader';
import { DefaultInput } from './DefaultInput';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  loading: boolean;
}

export const HintInput = React.forwardRef(
  ({ ref, loading, ...rest }: Props) => {
    return (
      <HintInputStyled>
        <LoaderContainerStyled>
          <ClipLoaderSpinner loading={loading} size={25} />
        </LoaderContainerStyled>
        <DefaultInput ref={ref} {...rest} />
      </HintInputStyled>
    );
  }
);
