import styled from 'styled-components';
import { AboutUsSectionStyled } from './AboutUsSection';

export const AboutIntroStyled = styled(AboutUsSectionStyled)`
  background: ${({ theme }) => theme.main.white};
`;
