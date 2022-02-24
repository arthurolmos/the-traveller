import styled from 'styled-components';
import { AboutUsSectionStyled } from './AboutUsSection';

export const DiscoverSectionStyled = styled(AboutUsSectionStyled)`
  background: transparent;
  color: black;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    // background-image: url('/assets/about-us/canoe.jpg');
    // background-image: url('/assets/about-us/sea-trip.jpg');
    // background-image: url('/assets/about-us/deep-forest.jpg');
    // background-image: url('/assets/about-us/forest.jpg');
    background: transparent url('/assets/about-us/olinda.jpg') no-repeat fixed
      center;
    z-index: -1;
    opacity: 0.5;
  }
`;
