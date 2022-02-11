import styled from 'styled-components';
import { DefaultFormStyled } from './DefaultForm';

export const SignFormStyled = styled(DefaultFormStyled)`
  width: 500px;

  @media (max-width: 600px) {
    width: 300px;
  }
`;
