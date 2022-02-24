import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import React from 'react';
import {
  DiscoverSection,
  ExperiencesSection,
  IntroSection,
  JoinSection,
} from '../../components/about-us';
import { MainContainer } from '../../components/layouts';

export function AboutUs() {
  return (
    <MainContainer title="About Us">
      <IntroSection />

      <DiscoverSection />

      <ExperiencesSection />

      <JoinSection />
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser()(AboutUs);
