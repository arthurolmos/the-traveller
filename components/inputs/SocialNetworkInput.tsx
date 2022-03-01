import React from 'react';
import { DefaultInput } from './DefaultInput';
import {
  SocialNetworkInputWrapperStyled,
  InputInfoStyled,
  InputSocialNetworkStyled,
  AddressWrapperStyled,
} from '../../styles/components/inputs/SocialNetworkInput';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  socialNetwork: 'Instagram' | 'Facebook' | 'Twitter';
  info?: string;
}

export const SocialNetworkInput = React.forwardRef(
  (props: Props, ref?: React.Ref<HTMLInputElement>) => {
    const { socialNetwork, info, ...rest } = props;

    return (
      <SocialNetworkInputWrapperStyled>
        <InputSocialNetworkStyled>{socialNetwork}</InputSocialNetworkStyled>
        <AddressWrapperStyled>
          https://{socialNetwork.toLowerCase()}.com/
          <DefaultInput ref={ref} {...rest} />
        </AddressWrapperStyled>
        {info && <InputInfoStyled>{info}</InputInfoStyled>}
      </SocialNetworkInputWrapperStyled>
    );
  }
);
